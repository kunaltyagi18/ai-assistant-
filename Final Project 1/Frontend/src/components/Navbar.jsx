import { useAuth } from '../context/AuthContext';
import { BookOpen, Settings, LogOut, FileText, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 🔖 Logo + Brand Name */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <BookOpen className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold text-gray-700">StudyGenie</span>
          </div>

          {/* ⚙️ Right-side Controls */}
          <div className="flex items-center space-x-4">
            {/* Summary Page Button */}
            <button
              onClick={() => navigate('/generate/summary')}
              className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
              aria-label="Summary Page"
            >
              <FileText className="w-5 h-5 text-gray-700" />
            </button>

            {/* Quiz Page Button */}
            <button
              onClick={() => navigate('/generate/quiz')}
              className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
              aria-label="Quiz Page"
            >
              <Zap className="w-5 h-5 text-gray-700" />
            </button>

            {/* Settings Button */}
            <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-700" />
            </button>

            {/* 👤 User Info */}
            {user && (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name || 'User'}
                  className="w-9 h-9 rounded-full border-2 border-pink-300"
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.name || 'Guest'}
                </span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
