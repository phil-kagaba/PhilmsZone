import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <img src={logo} alt="PhilmsZone Logo" className="w-24 h-24 mb-6 rounded-full object-cover" />

      <h1 className="text-5xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 text-sm sm:text-base mb-6 text-center">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
