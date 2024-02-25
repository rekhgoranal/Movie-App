import React, { useState, useEffect } from "react";
import './App.css'

const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getClassByRate = (vote) => {
    if (vote >= 7.5) return "green";
    else if (vote >= 7) return "orange";
    else return "red";
  };

  const showMovies = (movies) => {
    return movies.map((movie) => {
      const { id, title, poster_path, vote_average, overview } = movie;
      return (
        <div key={id} className="movie">
          <img src={`${IMG_PATH}${poster_path}`} alt={title}/>
          <div className="movie-info">
            <h3>{title}</h3>
            <span className={getClassByRate(vote_average)}>{vote_average}</span>
          </div>
          <div className="overview">
            <h3>Overview</h3>
            {overview}
          </div>
        </div>
      );
    });
  };

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm && searchTerm.trim() !== "") {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else {
      getMovies(API_URL);
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSearch}>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div id="main" className="movie-container">
        {showMovies(movies)}
      </div>
    </div>
  );
};

export default MovieApp;
