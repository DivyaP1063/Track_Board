
import React from 'react';
import { Link } from 'react-router-dom';
import { Kanban, CheckSquare, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Kanban className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TaskBoard</h1>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Organize Your Work with
          <span className="text-blue-600"> TaskBoard</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple and powerful Kanban board to help you manage your projects, 
          track progress, and collaborate with your team effectively.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose TaskBoard?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <CheckSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Task Management
            </h4>
            <p className="text-gray-600">
              Create, organize, and track your tasks with our intuitive drag-and-drop interface.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Team Collaboration
            </h4>
            <p className="text-gray-600">
              Assign tasks, set priorities, and collaborate seamlessly with your team members.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Boost Productivity
            </h4>
            <p className="text-gray-600">
              Visualize your workflow and identify bottlenecks to improve your team's efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Kanban className="w-6 h-6" />
            <span className="text-lg font-semibold">TaskBoard</span>
          </div>
          <p className="text-gray-400">
            © 2024 TaskBoard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
