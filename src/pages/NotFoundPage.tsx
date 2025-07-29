import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 text-white">
      <div className="max-w-xl w-full text-center p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-lg">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          Looks like you've ventured into deep space. The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
