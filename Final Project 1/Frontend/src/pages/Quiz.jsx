import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, next } = location.state || {};

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch quiz from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${process.env.VITE_API_BASE_UR}/api/quizzes`, {
          fileName,
        });
        // Assuming backend returns array of questions
        setQuiz(res.data.data || []);
      } catch (err) {
        console.error('Quiz fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load quiz.');
      } finally {
        setLoading(false);
      }
    };

    if (fileName) fetchQuiz();
  }, [fileName]);

  // Handle redirect if "next" exists
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
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          Quiz for <span className="text-pink-500">"{fileName || 'Untitled File'}"</span>
        </h1>

        {loading && <p className="text-gray-500 text-center">Loading quiz...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && quiz.length === 0 && (
          <p className="text-gray-500 text-center">No quiz available for this file.</p>
        )}

        <div className="space-y-6">
          {quiz.map((q, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl shadow-sm ${
                idx % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50'
              }`}
            >
              <p className="font-semibold text-gray-700 mb-3">
                {idx + 1}️⃣ {q.question}
              </p>
              <ul className="ml-6 list-disc text-gray-600 space-y-1">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {next && (
          <p className="mt-4 text-gray-500 italic text-center">
            Redirecting...
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
