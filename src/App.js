import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setReTry] = useState();
  const [check, setCheck] = useState(false);

  const fetchMoviesHandler = useCallback( async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying!');
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    }

    catch (error) {
      setError(error.message);
      setCheck(true);

      const retimer = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000)
      setReTry(retimer);
    }

    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const cancelretryHandler = () => {
    clearTimeout(retry);
    setCheck(false);
  };

  let content = <p>Found no movies.</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isloading) {
    content = <p>Loading...</p>
  }



  return (
    <React.Fragment>
      <MovieForm />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!error && content}
        {check && !isloading && error && (
        <span>
          <p>{content}</p>
          <button onClick={cancelretryHandler}>Cancel retrying</button>
        </span>
      )}
      </section>
    </React.Fragment>
  );
}

export default App;