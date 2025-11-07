import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Zap, Brain, Image as ImageIcon, ArrowRight, Star } from "lucide-react";
import Footer from "../components/Footer"; // corrected import

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Smart Summarization",
      description: "AI-powered summaries of your study materials in seconds",
    },
    {
      icon: Brain,
      title: "Quiz Generation",
      description: "Auto-generate quizzes to test your knowledge",
    },
    {
      icon: ImageIcon,
      title: "Image Generation",
      description: "Create visual aids for better understanding",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results instantly with our optimized AI",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "50K+", label: "Materials Processed" },
    { number: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-bold text-gray-700">StudyGenie</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 font-medium hover:text-pink-400 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-700 mb-6">
                Learn Smarter with{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  StudyGenie
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Transform your study materials into summaries, quizzes, and visual aids with AI.
                Study faster, retain more, achieve better grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-pink-400 text-white px-8 py-4 rounded-xl font-medium hover:bg-pink-500 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="border-2 border-purple-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-purple-50 hover:scale-105 transition-all"
                >
                  Sign In
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student learning with AI"
                className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
              >
                <p className="text-4xl font-bold text-pink-400 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="bg-purple-50/50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-700 mb-4">Powerful Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to revolutionize your study routine
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl shadow-lg p-8 sm:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of students who are already studying smarter with StudyGenie.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-pink-500 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 hover:scale-105 transition-all"
            >
              Start Your Free Trial
            </button>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="bg-purple-50/50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-12">What Students Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-pink-400 text-pink-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "StudyGenie saved me so much time! I can now study 3x faster and my grades have improved dramatically."
                  </p>
                  <p className="font-semibold text-gray-700">Sarah {idx + 1}</p>
                  <p className="text-sm text-gray-500">Student</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
