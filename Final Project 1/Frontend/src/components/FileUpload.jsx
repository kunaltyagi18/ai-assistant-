import { useState } from 'react';
import { Upload, FileText, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FileUpload({ onGenerate }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const navigate = useNavigate();

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // Handle generate summary/quiz/both
  const handleGenerate = (type) => {
    if (!file) return;
    setIsLoading(true);

    setTimeout(() => {
      if (type === 'summary') navigate('/generate/summary', { state: { fileName: file.name } });
      else if (type === 'quiz') navigate('/generate/quiz', { state: { fileName: file.name } });
      else if (type === 'both')
        navigate('/generate/summary', { state: { fileName: file.name, next: '/generate/quiz' } });

      if (onGenerate) onGenerate(type, file);
      setIsLoading(false);
    }, 600);
  };

  // Handle AI image generation (mock example)
  const handleGenerateImage = () => {
    if (!imagePrompt) return;
    const mockImages = [
      'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/4143791/pexels-photo-4143791.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    setGeneratedImages(mockImages);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* File Upload */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Upload Study Material</h3>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging ? 'border-pink-400 bg-pink-50' : 'border-purple-200 bg-purple-50/30'
          }`}
        >
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.txt" />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto mb-3 text-purple-300" />
            <p className="text-gray-700 font-medium mb-1">
              {file ? file.name : 'Drop your file here or click to browse'}
            </p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT files supported</p>
          </label>
        </div>

        {file && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
            <FileText className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          {[
            { type: 'summary', label: 'Generate Summary', color: 'bg-pink-400 hover:bg-pink-500' },
            { type: 'quiz', label: 'Generate Quiz', color: 'bg-purple-400 hover:bg-purple-500' },
            {
              type: 'both',
              label: 'Generate Both',
              color: 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500',
            },
          ].map((btn) => (
            <button
              key={btn.type}
              onClick={() => handleGenerate(btn.type)}
              disabled={!file || isLoading}
              className={`flex-1 min-w-[150px] ${btn.color} text-white px-4 py-3 rounded-xl font-medium hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Image Generator */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">AI Image Generator</h3>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          />
          <button
            onClick={handleGenerateImage}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 hover:scale-105 transition-all"
          >
            Generate Image
          </button>
        </div>

        {generatedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <a href={img} target="_blank" rel="noopener noreferrer" download>
                  <img src={img} alt={`Generated ${idx + 1}`} className="w-full h-48 object-cover" />
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-purple-50/50 rounded-xl p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-400">Generated images will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
