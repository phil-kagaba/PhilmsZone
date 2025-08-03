// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminUpload from './components/admin/AdminUpload';
import VideoPlayer from './components/VideoPlayer';
import Footer from './components/Footer';
import MyMovieApis from './components/mapi';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen flex flex-col text-white">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminUpload />} />
            <Route path="/AdminUpload" element={<AdminUpload />} />
            <Route path="/video/:filecode" element={<VideoPlayer />} />
            <Route path="/trailer" element={<MyMovieApis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
