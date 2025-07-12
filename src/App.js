import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchApiHandler() {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.py4e.com/api/films');
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
      setIsLoading(false);
    } catch {
      alert('Error in fetching the details');
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchApiHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && (
          <p>There are no movies to display</p>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
