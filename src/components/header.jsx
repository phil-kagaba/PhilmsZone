import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          🎬 PhilmsZone
        </h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#" className="hover:text-yellow-400 transition">Trending</a>
          <a href="#" className="hover:text-yellow-400 transition">Genres</a>
          <a href="#" className="hover:text-yellow-400 transition">My List</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
