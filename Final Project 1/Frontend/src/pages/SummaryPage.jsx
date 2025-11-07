import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, next } = location.state || {};

  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch summary from backend
  useEffect(() => {
    const fetchSummary = async () => {
      if (!fileName) return;
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.VITE_API_BASE_UR}/api/summary`,
          { fileName }
        );
        setSummary(res.data.data || 'No summary available.');
      } catch (err) {
        console.error('Summary fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load summary.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [fileName]);

  // Redirect to quiz if "next" exists
  useEffect(() => {
    if (next) {
      const timer = setTimeout(() => {
        navigate(next, { state: { fileName } });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [next, navigate, fileName]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Summary for <span className="text-pink-500">"{fileName || 'Untitled File'}"</span>
        </h1>

        {loading && <p className="text-gray-500 text-center">Generating summary...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-50 p-6 rounded-2xl shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <p className="text-gray-700 font-semibold">Generated Summary:</p>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </motion.div>
        )}

        {next && !loading && (
          <p className="mt-4 text-gray-500 italic text-center">
            Redirecting to Quiz...
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
