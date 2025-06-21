import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} MovieZone. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 transition">Terms of Use</a>
          <a href="#" className="hover:text-yellow-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
