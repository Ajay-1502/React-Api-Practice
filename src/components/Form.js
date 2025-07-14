import { useState, useEffect } from 'react';

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
        <input
          id="text"
          type="text"
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
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};

export default Form;
