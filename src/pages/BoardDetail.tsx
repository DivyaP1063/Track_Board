
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { createColumn, moveTask } from '../store/boardSlice';
import Column from '../components/Column';
import AuthButton from '../components/AuthButton';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const BoardDetail: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => boardId ? state.boards.boards[boardId] : null);
  const columns = useAppSelector((state) => state.boards.columns);
  const tasks = useAppSelector((state) => state.boards.tasks);

  if (!board) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Board not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to boards
          </Link>
        </div>
      </div>
    );
  }

  const boardColumns = board.columnIds.map(id => columns[id]).filter(Boolean);
  
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return Object.values(tasks).filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priorityFilter]);

  const sortedTasksByColumn = useMemo(() => {
    const tasksByColumn: Record<string, typeof filteredTasks> = {};
    
    boardColumns.forEach(column => {
      let columnTasks = column.taskIds
        .map(id => tasks[id])
        .filter(task => task && filteredTasks.some(ft => ft.id === task.id));
      
      // Sort tasks
      columnTasks.sort((a, b) => {
        switch (sortBy) {
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'dueDate':
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          case 'assignedTo':
            return a.assignedTo.localeCompare(b.assignedTo);
          default:
            return a.order - b.order;
        }
      });
      
      tasksByColumn[column.id] = columnTasks;
    });
    
    return tasksByColumn;
  }, [boardColumns, tasks, filteredTasks, sortBy]);
  
  const handleCreateColumn = () => {
    if (newColumnTitle.trim()) {
      dispatch(createColumn({ boardId: board.id, title: newColumnTitle.trim() }));
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(moveTask({
      taskId: draggableId,
      fromColumnId: source.droppableId,
      toColumnId: destination.droppableId,
      newIndex: destination.index,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 transition-colors p-2 hover:bg-white rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{board.title}</h1>
              {board.description && (
                <p className="text-gray-600 mt-1">{board.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Add Column Button - Now in header */}
            {isAddingColumn ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateColumn()}
                  placeholder="Column title"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-40"
                  autoFocus
                />
                <Button
                  onClick={handleCreateColumn}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add
                </Button>
                <Button
                  onClick={() => {
                    setIsAddingColumn(false);
                    setNewColumnTitle('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsAddingColumn(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Column
              </Button>
            )}
            <AuthButton />
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="assignedTo">Assignee</SelectItem>
                  <SelectItem value="order">Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {boardColumns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${snapshot.isDraggingOver ? 'bg-blue-50' : ''} transition-colors rounded-lg`}
                  >
                    <Column
                      column={column}
                      tasks={sortedTasksByColumn[column.id] || []}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDetail;
