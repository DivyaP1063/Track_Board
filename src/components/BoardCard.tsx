
import React from 'react';
import { Board } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BoardCardProps {
  board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 truncate">{board.title}</h3>
          <Link
            to={`/board/${board.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{board.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{board.createdBy}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(board.createdAt)}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link
            to={`/board/${board.id}`}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
          >
            Open Board
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
