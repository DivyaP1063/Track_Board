import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AppState, Board, Column, Task } from '../types';

const initialState: AppState = {
  boards: {},
  columns: {},
  tasks: {},
  currentUser: '', // Start with empty user
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    
    createBoard: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const id = uuidv4();
      const newBoard: Board = {
        id,
        title: action.payload.title,
        description: action.payload.description,
        createdBy: state.currentUser || 'Anonymous',
        createdAt: new Date().toISOString(),
        columnIds: [],
      };
      state.boards[id] = newBoard;
    },
    
    deleteBoard: (state, action: PayloadAction<string>) => {
      const boardId = action.payload;
      const board = state.boards[boardId];
      if (board) {
        // Delete all columns and tasks in this board
        board.columnIds.forEach(columnId => {
          const column = state.columns[columnId];
          if (column) {
            column.taskIds.forEach(taskId => {
              delete state.tasks[taskId];
            });
            delete state.columns[columnId];
          }
        });
        delete state.boards[boardId];
      }
    },
    
    createColumn: (state, action: PayloadAction<{ boardId: string; title: string }>) => {
      const id = uuidv4();
      const board = state.boards[action.payload.boardId];
      const newColumn: Column = {
        id,
        title: action.payload.title,
        boardId: action.payload.boardId,
        order: board.columnIds.length,
        taskIds: [],
      };
      state.columns[id] = newColumn;
      board.columnIds.push(id);
    },
    
    updateColumn: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const column = state.columns[action.payload.id];
      if (column) {
        column.title = action.payload.title;
      }
    },
    
    deleteColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      const column = state.columns[columnId];
      if (column) {
        // Delete all tasks in this column
        column.taskIds.forEach(taskId => {
          delete state.tasks[taskId];
        });
        
        // Remove column from board
        const board = state.boards[column.boardId];
        if (board) {
          board.columnIds = board.columnIds.filter(id => id !== columnId);
        }
        
        delete state.columns[columnId];
      }
    },
    
    createTask: (state, action: PayloadAction<{
      columnId: string;
      title: string;
      description: string;
      assignedTo: string;
      priority: 'high' | 'medium' | 'low';
      dueDate: string;
    }>) => {
      const id = uuidv4();
      const column = state.columns[action.payload.columnId];
      const newTask: Task = {
        id,
        title: action.payload.title,
        description: action.payload.description,
        createdBy: state.currentUser || 'Anonymous',
        assignedTo: action.payload.assignedTo,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        columnId: action.payload.columnId,
        order: column.taskIds.length,
        createdAt: new Date().toISOString(),
      };
      state.tasks[id] = newTask;
      column.taskIds.push(id);
    },
    
    updateTask: (state, action: PayloadAction<{
      id: string;
      title: string;
      description: string;
      assignedTo: string;
      priority: 'high' | 'medium' | 'low';
      dueDate: string;
    }>) => {
      const task = state.tasks[action.payload.id];
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.assignedTo = action.payload.assignedTo;
        task.priority = action.payload.priority;
        task.dueDate = action.payload.dueDate;
      }
    },
    
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks[taskId];
      if (task) {
        const column = state.columns[task.columnId];
        if (column) {
          column.taskIds = column.taskIds.filter(id => id !== taskId);
        }
        delete state.tasks[taskId];
      }
    },
    
    moveTask: (state, action: PayloadAction<{
      taskId: string;
      fromColumnId: string;
      toColumnId: string;
      newIndex: number;
    }>) => {
      const { taskId, fromColumnId, toColumnId, newIndex } = action.payload;
      const task = state.tasks[taskId];
      const fromColumn = state.columns[fromColumnId];
      const toColumn = state.columns[toColumnId];
      
      if (task && fromColumn && toColumn) {
        // Remove task from source column
        fromColumn.taskIds = fromColumn.taskIds.filter(id => id !== taskId);
        
        // Add task to destination column at specific index
        toColumn.taskIds.splice(newIndex, 0, taskId);
        
        // Update task's column reference
        task.columnId = toColumnId;
      }
    },
  },
});

export const {
  setCurrentUser,
  createBoard,
  deleteBoard,
  createColumn,
  updateColumn,
  deleteColumn,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} = boardSlice.actions;

export default boardSlice.reducer;
