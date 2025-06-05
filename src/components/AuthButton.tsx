
import React from 'react';
import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const AuthButton: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-gray-700">
          <User className="w-4 h-4" />
          <span className="text-sm">{user.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return null;
};

export default AuthButton;
