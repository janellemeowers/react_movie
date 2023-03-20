import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2ec9fb25";

const App = () => {
  //new state, default empty
  const [movies, setMovies] = useState([]);
  //search term, another state, empty string to start
  const [searchTerm, setSearchTerm] = useState("");

  //async fetch request func
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = response.json();

    data.then((res) => {
      setMovies(res.Search);
    });
  };

  useEffect(() => {
    searchMovies("Disney");
  }, []);

  return (
    <div className="app">
      <h1>NetLand</h1>

      <div className="search">
        <input
          placeholder="Enter a movie"
          value={searchTerm}
          //   e is the event, pass in target value, callback func
          //set searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* //icon is search button, call searchMovies func w/state */}
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        // if movies arry is empty
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

//components get exported
export default App;
