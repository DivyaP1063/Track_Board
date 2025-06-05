
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Task } from '../types';
import { Calendar, User, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{task.title}</h4>
        <div className="flex space-x-1 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <div className="mb-3">
          {isExpanded ? (
            <div className="text-gray-600 text-xs prose prose-sm max-w-none">
              <ReactMarkdown>{task.description}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-600 text-xs line-clamp-2">{task.description}</p>
          )}
          {task.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Show more
                </>
              )}
            </button>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          {task.priority.toUpperCase()}
        </span>
        
        <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <Calendar className="w-3 h-3" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 text-xs text-gray-500">
        <User className="w-3 h-3" />
        <span>{task.assignedTo}</span>
      </div>
    </div>
  );
};

export default TaskCard;
