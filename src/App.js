import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// 1680f359
const API_URL = 'http://omdbapi.com?apikey=1680f359';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);  // To track error state

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === "False") {
        setMovies([]);  // Clear previous movie results if no results
        setError("No movie found");
      } else {
        setMovies(data.Search);
        setError(null);  // Reset error if movies are found
      }
    } catch (err) {
      setMovies([]);  // Clear movies on error
      setError("An error occurred while fetching movie data.");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    }
  }, [searchTerm]);  // Update when searchTerm changes

  return (
    <div className="app">
      <h1>MovieMiner</h1>
      <div className="search">
        <input
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {error ? (
        <div className="empty">
          <h2>{error}</h2>
        </div>
      ) : (
        movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies</h2>
          </div>
        )
      )}
    </div>
  );
};

export default App;
