
import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { useAppSelector } from '../hooks/useRedux';
import BoardCard from '../components/BoardCard';
import CreateBoardModal from '../components/CreateBoardModal';

const BoardList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boards = useAppSelector((state) => Object.values(state.boards.boards));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Boards</h1>
            <p className="text-gray-600">Organize and track your team's work efficiently</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Board</span>
          </button>
        </div>

        {boards.length === 0 ? (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No boards yet</h3>
            <p className="text-gray-500 mb-6">Create your first board to get started with organizing tasks</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        )}

        <CreateBoardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default BoardList;
