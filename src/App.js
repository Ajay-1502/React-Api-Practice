import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import Form from './components/Form';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldRetry, setShouldRetry] = useState(true);

  const fetchApiHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-movie-b7b2e-default-rtdb.firebaseio.com/movies.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();

      let moviesReceived = [];

      for (let key in data) {
        moviesReceived.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(moviesReceived);
      setShouldRetry(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchApiHandler();
  }, [fetchApiHandler]);

  useEffect(() => {
    let retryTimer;
    if (error && shouldRetry) {
      retryTimer = setTimeout(() => {
        console.log('Fetching api');
        fetchApiHandler();
      }, 5000);
    }
    return () => clearTimeout(retryTimer);
  }, [error, shouldRetry, fetchApiHandler]);

  return (
    <React.Fragment>
      <Form />
      <section>
        <button onClick={fetchApiHandler}>Fetch Movies</button>
        <button
          onClick={() => setShouldRetry(false)}
          style={{ marginLeft: '10px' }}
        >
          Stop Retrying
        </button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <p>There are no movies to display</p>
        )}
        {isLoading && !error && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
