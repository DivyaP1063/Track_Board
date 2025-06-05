
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import { useAppDispatch } from '../hooks/useRedux';
import { createTask, updateTask, deleteTask, updateColumn, deleteColumn } from '../store/boardSlice';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    assignedTo: string;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
  }) => {
    dispatch(createTask({
      columnId: column.id,
      ...taskData,
    }));
  };

  const handleUpdateTask = (taskData: {
    title: string;
    description: string;
    assignedTo: string;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
  }) => {
    if (editingTask) {
      dispatch(updateTask({
        id: editingTask.id,
        ...taskData,
      }));
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleUpdateColumn = () => {
    if (columnTitle.trim()) {
      dispatch(updateColumn({ id: column.id, title: columnTitle.trim() }));
      setIsEditingColumn(false);
    }
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(column.id));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        {isEditingColumn ? (
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleUpdateColumn}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdateColumn()}
            className="font-semibold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 text-sm"
            autoFocus
          />
        ) : (
          <h3 className="font-semibold text-gray-800 flex items-center">
            {column.title}
            <span className="ml-2 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">
              {tasks.length}
            </span>
          </h3>
        )}
        
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showColumnMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border">
              <button
                onClick={() => {
                  setIsEditingColumn(true);
                  setShowColumnMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit className="w-3 h-3 mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteColumn();
                  setShowColumnMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? 'rotate-3 shadow-lg' : ''} transition-transform`}
              >
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>
      
      <button
        onClick={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }}
        className="w-full flex items-center justify-center py-2 text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </button>
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      />
    </div>
  );
};

export default Column;
