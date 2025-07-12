import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldRetry, setShouldRetry] = useState(true);

  async function fetchApiHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.py4e.com/api/film');

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      setShouldRetry(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    let retryTimer;
    if (error && shouldRetry) {
      retryTimer = setTimeout(() => {
        console.log('Fetching api');
        fetchApiHandler();
      }, 5000);
    }
    return () => clearTimeout(retryTimer);
  }, [error, shouldRetry]);

  return (
    <React.Fragment>
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
