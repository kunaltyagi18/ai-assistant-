import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock } from 'lucide-react';

import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth(); // AuthContext login
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      await login(email, password); 
      navigate('/dashboard');     
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      {/* Back to Home */}
      <div className="absolute top-5 left-5">
        <button
          onClick={() => navigate('/')}
          className="text-sm font-medium text-pink-400 hover:text-pink-500 transition-all"
        >
          ← Back to Home
        </button>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="w-12 h-12 text-pink-400" />
              <h1 className="text-4xl font-bold text-gray-700">StudyGenie</h1>
            </div>
            <p className="text-gray-600">Welcome back 👋 Login to continue your learning journey</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-8 border border-pink-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login to StudyGenie'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-pink-400 hover:text-pink-500 font-medium">
                Create one
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
