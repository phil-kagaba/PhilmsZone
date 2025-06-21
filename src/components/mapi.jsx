import axios from "axios";
import React, { useEffect, useState } from "react";

const MyMovieApis = () => {
  const [mymovie, setMymovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const gettingData = async () => {
      try {
        const mydata = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=df498dfd349cbb0a91d054609f9df7d3&language=en-US&page=50"
        );
        setMymovie(mydata.data.results);
      } catch (error) {
        console.error("An error occurred:", error);
        setError(error);
      }
    };
    gettingData();
  }, []);

  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Movies
      </h2>

      {error ? (
        <p className="text-red-500 text-center">Oops! Something went wrong.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mymovie.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                className="w-full h-72 object-cover"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyMovieApis;
