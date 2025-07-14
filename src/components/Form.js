import { useState } from 'react';
import './Form.css';

const Form = () => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const SubmitHandler = async (event) => {
    event.preventDefault();

    const movieObject = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };

    try {
      const response = await fetch(
        'https://react-movie-b7b2e-default-rtdb.firebaseio.com/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movieObject),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setTitle('');
      setOpeningText('');
      setReleaseDate('');
    } catch (error) {
      console.log(error);
    }
  };

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
