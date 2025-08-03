import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchMovieByTitle, getMovieTrailer } from '../utils/tmdbApi';
import {
  ArrowLeft,
  Download,
  Play,
  Star,
  Clock,
  Calendar,
  Film,
  ChevronDown,
  ChevronUp,
  Youtube,
} from 'lucide-react';
import logo from '../assets/logo.png';
import Header from './Header';
import TrailerModal from './TrailerModal';

const LogoLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
    <div className="relative w-20 h-20 mb-6">
      <div className="w-full h-full border-4 border-gray-700 border-t-red-500 rounded-full animate-spin" />
      <img
        src={logo}
        alt="PhilmsZone Logo"
        className="absolute top-1/2 left-1/2 h-16 w-16 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div className="text-center">
      <p className="text-white text-lg sm:text-xl font-semibold mb-2">Loading movie...</p>
      <p className="text-gray-400 text-sm">Preparing your movie experience</p>
    </div>
  </div>
);

const VideoCard = ({ video, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/50 ${
        isActive ? 'bg-red-500/20 border border-red-500/30' : 'bg-gray-800/30'
      }`}
      onClick={onClick}
    >
      <div className="relative w-20 sm:w-24 h-12 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
        <img
          src={
            video.thumbnail ||
            video.screenshot ||
            `https://cdn.streamhg.com/snapshots/${video.file_code || video.filecode}.jpg`
          }
          alt={video.title || video.filename}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599856026-e27b5e10d4b4?w=200&h=120&fit=crop';
          }}
        />
        {isActive && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
            <Play className="h-5 sm:h-6 w-5 sm:w-6 text-white fill-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold truncate text-sm sm:text-base ${isActive ? 'text-red-400' : 'text-white'}`}>
          {video.title || video.filename}
        </h3>
        <div className="flex items-center space-x-3 mt-1 text-xs sm:text-sm text-gray-400">
          {video.length && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{video.length}s</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span>8.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = () => {
  const { filecode } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showCount, setShowCount] = useState(5);
  const [tmdbData, setTmdbData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  // Force scroll to top on page load or filecode change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filecode]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/videos')
      .then((res) => setVideos(res.data || []))
      .catch(() => setError('Failed to load videos'));
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const vid = videos.find((v) => v.file_code === filecode || v.filecode === filecode);
    if (vid) {
      setVideo(vid);
      setShowIframe(false);
      setError(null);
      fetchTMDBData(vid);
    } else {
      setVideo(null);
      setError('Video not found');
    }
    setLoading(false);
  }, [filecode, videos]);

  const fetchTMDBData = async (videoData) => {
    try {
      const tmdb = await searchMovieByTitle(videoData.title || videoData.filename);
      setTmdbData(tmdb);
    } catch (error) {
      console.error('Error fetching TMDB data:', error);
    }
  };

  const handleWatchTrailer = async () => {
    if (!tmdbData?.tmdbId) {
      alert('Trailer not available for this movie');
      return;
    }

    setLoadingTrailer(true);
    try {
      const trailer = await getMovieTrailer(tmdbData.tmdbId);
      if (trailer) {
        setTrailerKey(trailer);
        setShowTrailer(true);
      } else {
        alert('No trailer found for this movie');
      }
    } catch (error) {
      alert('Failed to load trailer');
    }
    setLoadingTrailer(false);
  };

  const handleSearch = (term) => {
    const results = videos.filter((v) => {
      const title = (v.title || v.filename || '').toLowerCase();
      return title.includes(term.toLowerCase());
    });
    setSearchResults(results);
  };

  if (loading) return <LogoLoader />;
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header onSearch={handleSearch} searchResults={searchResults} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <Film className="h-12 sm:h-16 w-12 sm:w-16 text-red-500 mx-auto mb-4" />
            <p className="text-xl sm:text-2xl text-red-500 font-semibold mb-4">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 sm:h-5 w-4 sm:w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = video.link || `https://gradehgplus.com/${filecode}`;
  const visibleVideos = videos.slice(0, showCount);
  const previewImage =
    video.thumbnail ||
    video.screenshot ||
    `https://cdn.streamhg.com/snapshots/${filecode}.jpg`;

  return (
    <div className="min-h-screen bg-gray-900 pt-16 sm:pt-20">
      <Header onSearch={handleSearch} searchResults={searchResults} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 sm:h-5 w-4 sm:w-5" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {/* ▶️ Video Player or Thumbnail */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl mb-6">
              <div className="relative w-full h-0 pb-[56.25%]">
                {!showIframe ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1489599856026-e27b5e10d4b4?w=400';
                      }}
                    />
                    <button
                      onClick={() => setShowIframe(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                    >
                      <Play className="h-8 sm:h-12 w-8 sm:w-12 text-white fill-white" />
                    </button>
                  </>
                ) : (
                  <iframe
                    src={embedUrl}
                    title={tmdbData?.title || video.title || video.filename}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    scrolling="no"
                  />
                )}
              </div>
            </div>

            {/* 📄 Movie Info */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {tmdbData?.title || video.title || video.filename}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm sm:text-base font-semibold">{tmdbData?.rating?.toFixed(1) || '8.5'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">{tmdbData?.releaseDate ? new Date(tmdbData.releaseDate).getFullYear() : '2024'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">{video.length ? `${video.length}s` : '120 min'}</span>
                </div>
                <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">HD</div>
              </div>

              {(tmdbData?.description || video.file_descr) && (
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                  {tmdbData?.description || video.file_descr}
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={handleWatchTrailer}
                  disabled={loadingTrailer}
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  <Youtube className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span>{loadingTrailer ? 'Loading...' : 'Watch Trailer'}</span>
                </button>

                {video.link && (
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span>Download</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 🎬 Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 sticky top-20 sm:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center space-x-2">
                <Film className="h-4 sm:h-5 w-4 sm:w-5 text-red-500" />
                <span>More Movies</span>
              </h2>

              {videos.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No movies available</p>
              ) : (
                <div className="space-y-3 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto scrollbar-hide">
                  {visibleVideos.map((v) => {
                    const isActive = (v.file_code || v.filecode) === filecode;
                    return (
                      <VideoCard
                        key={v.file_code || v.filecode}
                        video={v}
                        isActive={isActive}
                        onClick={() => navigate(`/video/${v.file_code || v.filecode}`)}
                      />
                    );
                  })}
                </div>
              )}

              {videos.length > 8 && (
                <div className="mt-4 sm:mt-6 text-center">
                  {showCount < videos.length ? (
                    <button
                      onClick={() => setShowCount(showCount + 8)}
                      className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <span className="text-sm sm:text-base">Show More</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCount(8)}
                      className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <span className="text-sm sm:text-base">Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TrailerModal
        youtubeKey={trailerKey}
        onClose={() => {
          setShowTrailer(false);
          setTrailerKey(null);
        }}
        title={tmdbData?.title || video?.title || video?.filename}
      />
    </div>
  );
};

export default VideoPlayer;
