const Footer = () => {
  return (
    <footer className="bg-white border-t border-pink-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Made with ❤️ by{' '}
            <a
              href="https://studygenie.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pink-400 hover:text-pink-500 transition-colors"
            >
              StudyGenie Team
            </a>{' '}
            | © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






