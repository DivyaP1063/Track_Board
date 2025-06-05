
export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  columnId: string;
  order: number;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  order: number;
  taskIds: string[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  columnIds: string[];
}

export interface AppState {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  currentUser: string;
}
