import { useState, useEffect } from 'react';
import './Form.css';

const Form = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const SubmitHandler = (event) => {
    event.preventDefault();

    const movieObject = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
    setMovies((prev) => [...prev, { ...movieObject }]);

    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <>
      <section>
        <form onSubmit={SubmitHandler}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="text">Opening Text</label>
          <textarea
            id="text"
            value={openingText}
            onChange={(e) => setOpeningText(e.target.value)}
            required
          />
          <label htmlFor="date">Release Date</label>
          <input
            id="date"
            type="text"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
          <button id="button" type="submit">
            Add Movie
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
