import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: 'calc(50% - 170px)',
    left: 'calc(50% - 400px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: 'auto',
    transform: 'rotateX(20deg)',
    maxWidth: '850px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
};

Modal.setAppElement('#root');

const MovieModal = ({ isOpen, onRequestClose, movie}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <h2 className='modal-title'>{movie.title}</h2>
      <div className="row">
        <div className="col-6">
          <img src={movie.link} alt={movie.title} className='modal-image' />
        </div>
        <div className="col-6">
          <p className='font'>{movie.overview}</p>
          <label>Release Date</label>
          <p className='font'> {movie.release_date} </p>
        </div>
      </div>
      <button onClick={onRequestClose} className="btn btn-success close-2">Close</button>
    </Modal>
  );
};

export default MovieModal;