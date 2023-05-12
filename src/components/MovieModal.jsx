import React from 'react'
import Modal from 'react-modal'
import ReactPlayer from 'react-player'

const customStyles = {
  content: {
    top: 'calc(50% - 240px)',
    left: 'calc(50% - 490px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: 'auto',
    transform: 'rotateX(20deg)',
    maxWidth: '1050px',
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
      <div className="trailer">
        <div className="trailer" style={{width: '70%', height: '70%'}}>
          <ReactPlayer
            className='player'
            url={movie.trailer}
            width='450px'
            height='300px'
            controls
            playing
            volume='0.8'
          />
        </div>
        <div className="col-6">
          <label className='font-title'><strong>Overview</strong></label>
          <p className='font'>{movie.overview}</p>

        </div>
      </div>
      <button onClick={onRequestClose} className="btn btn-danger close-2">Close</button>
    </Modal>
  );
};

export default MovieModal;