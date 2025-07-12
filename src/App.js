import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchApiHandler() {
    /*fetch('https://swapi.py4e.com/api/films')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        setMovies(transformedMovies);
      });*/

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
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
