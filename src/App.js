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
      const response = await fetch("https://react-http-3914e-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying!');
      }

      const data = await response.json();
      
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releasedate,
        });
      }

      setMovies(loadedMovies);
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
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-3914e-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    fetchMoviesHandler();
    console.log(data);
  };

  const deleteMovieHandler = async (id) => {
    await fetch(
      `https://react-http-62b90-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchMoviesHandler();
  };


  const cancelretryHandler = () => {
    clearTimeout(retry);
    setCheck(false);
  };

  let content = <p>Found no movies.</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} deleteRequest={deleteMovieHandler}/>
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isloading) {
    content = <p>Loading...</p>
  }



  return (
    <React.Fragment>
      <MovieForm onAddMovie={addMovieHandler}/>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!error && <MoviesList movies={movies} deleteRequest={deleteMovieHandler}/>}
        {check && !isloading && error && (
        <span>
          {content}<br/>
          <button onClick={cancelretryHandler}>Cancel retrying</button>
        </span>
      )}
      </section>
    </React.Fragment>
  );
}

export default App;