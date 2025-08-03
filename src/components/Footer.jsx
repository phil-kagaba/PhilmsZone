import React from 'react';
import logo from '../assets/logo.png';
import {
  Facebook, Twitter, Instagram, Youtube, Film
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand & About */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={logo}
              alt="PhilmZone Logo"
              className="h-14 w-14 object-cover"
            />
            <span className="text-white font-bold text-2xl tracking-wide">PhilmZone</span>
          </div>
          <h2 className="text-white text-lg font-semibold mb-2">About Us</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong>Welcome to <span className="text-white">PhilmZone</span>!</strong><br /><br />
            Your go-to destination for everything movies. Discover the latest releases, watch trailers, read reviews, and explore the world of cinema. 
            Whether you're into action, comedy, drama, or indie gems, we've got something for every film lover. Dive in and enjoy the journey!
          </p>
        </div>

        {/* About Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Team</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Careers</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Blog</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-500 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-500 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-500 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-500 transition"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-gray-800 pt-4 px-4 text-center text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Film className="h-4 w-4 text-red-500" />
          <span>© {new Date().getFullYear()} PhilmZone. All rights reserved.</span>
        </div>
        <div className="space-x-4 text-sm">
          <a href="#" className="hover:text-red-500 transition">Sitemap</a>
          <a href="#" className="hover:text-red-500 transition">Legal</a>
          <a href="#" className="hover:text-red-500 transition">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
