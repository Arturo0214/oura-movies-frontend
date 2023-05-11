import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createMovie } from '../features/movies/movieSlice';

const customStyles = {
  content: {
    display: 'flex',
    top: 'calc(50% - 280px)',
    width: '700px',
    height: '570px',
    left: 'calc(50% - 300px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: 'auto',
    transform: 'rotateX(20deg)',
    maxWidth: '850px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
}

Modal.setAppElement('#root')

const CreateMovie = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch()
  const [movieData, setMovieData] = useState({
    genre: '',
    adult: false,
    backdrop_path: '',
    original_language: '',
    title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    video: false,
    likes: [],
    link: '',
    trailer: '',
  });

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMovie(movieData));
    setMovieData({
      genre: '',
      adult: false,
      backdrop_path: '',
      original_language: '',
      title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '',
      video: false,
      likes: [],
      link: '',
      trailer: '',
    })
    onRequestClose()
  };


  return (
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    style={customStyles}>
      <div className='movie-form'>
      <form 
      onSubmit={handleSubmit}>
        <br />
        <div className="input-group">
          <div className="input-space">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movieData.genre}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="input-group">
        <div className='input-check-space'>
        <label htmlFor="adult">Adult:</label>
        <input
        type="checkbox"
        id='adult'
        name="adult"
        checked={movieData.adult}
        onChange={handleCheckboxChange}
        required
        />
        </div>
     </div>
        <div className="input-group">
          <div className="input-space">
          <label htmlFor="backdrop_path">Backdrop Path: </label>
          <input
            type="text"
            className="form-control"
            id="backdrop_path"
            name="backdrop_path"
            value={movieData.backdrop_path}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="input-group">
          <div className="input-space">
          <label htmlFor="original_language">Original Language: </label>
          <input
            type="text"
            className="form-control"
            id="original_language"
            name="original_language"
            value={movieData.original_language}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="input-group">
          <div className="input-space">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="input-group">
          <div className="input-space">
          <label htmlFor="overview">Overview</label>
          <input
            type="text"
            className="form-control"
            id="overview"
            name="overview"
            value={movieData.overview}
            onChange={handleInputChange}
          />
          </div>
        </div>
        <div className="input-group">
        <div className="input-space">
        <label htmlFor="popularity">Popularity:</label>
        <input
          type="number"
          name="popularity"
          id="popularity"
          value={movieData.popularity}
          onChange={handleInputChange}
          required
        />
        </div>
      </div>
      <div className="input-group">
        <div className="input-space">
        <label htmlFor="poster_path">Poster Path:</label>
        <input
          type="text"
          name="poster_path"
          id="poster_path"
          value={movieData.poster_path}
          onChange={handleInputChange}
          required
        />
        </div>
      </div>
      <div className="input-group">
        <div className="input-space">
        <label htmlFor="release_date">Release Date:</label>
        <input
          type="date"
          name="release_date"
          id="release_date"
          value={movieData.release_date}
          onChange={handleInputChange}
          required
        />
        </div>
      </div>
      <div className="input-group">
        <div className="input-check-space">
        <label htmlFor="video">Video:</label>
        <input
       type="checkbox"
       id='video'
       name="video"
       value={movieData.video}
       onChange={handleCheckboxChange}
       required
     />
     </div>
     </div>
     <div className="input-group">
       <div className="input-space">
        <label htmlFor="likes">Likes:</label>
        <input
              type="number"
              name="likes"
              value={movieData.likes}
              onChange={handleInputChange}
            />
        </div>
    </div>
    <div className="input-group">
      <div className="input-space">
    <label htmlFor="link">Link:</label>
    <input
          type="text"
          name="link"
          value={movieData.link}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="input-group">
      <div className="input-space">
    <label htmlFor="trailer">Trailer:</label>
    <input
          type="text"
          name="trailer"
          value={movieData.trailer}
          onChange={handleInputChange}
        />
    </div>
    </div>
    <div className="center">
    <button className="btn gradient-blue mx-2" onClick={handleSubmit} style={{width: '160px'}}>
    <strong>Create Movie</strong>
    </button>
    <button className="btn gradient-gray mx-2 close-2 text-white" onClick={onRequestClose}>
     Cancel
    </button>
    </div>
      </form>
  </div>
  </Modal>
  )
}
export default CreateMovie

