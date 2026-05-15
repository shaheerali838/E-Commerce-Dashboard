import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FiAlertCircle className="w-24 h-24 text-slate-400" />
        </div>
        <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="bg-slate-200 text-slate-900 px-6 py-3 rounded-md font-medium hover:bg-slate-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
