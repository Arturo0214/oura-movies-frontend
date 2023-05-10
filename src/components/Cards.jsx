import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../features/movies/movieSlice";
import { useSelector } from "react-redux";
import MovieModal from "./MovieModal";
import "../pages/dashboard.css";
import like from '../assets/amor.png'
import star from '../assets/estrella.png'

const Cards = ({ movie }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likes, setLikes] = useState(movie.likes)

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const updateLikes = async (movieId, newLikes) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: newLikes })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was an error updating likes:', error);
    }
  }

  const handleLikeClick = async () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    await updateLikes(movie._id, newLikes)
  }


  return (
    <>
      <div className="card" style={{ maxWidth: "262px" }}>
        <img src={movie.link} className="img-fluid" onClick={handleModalOpen} />
        <div className="card-body">
          <h4 className="card-title">{movie.title}</h4>
        </div>
        <section className="card-ending">
        <img 
        src={star} 
        style={{width: '30px', height: '30px'}}
        className='star' />  
        <p className="popularity"> <strong>{movie.popularity}</strong></p>

        {user.isAdmin === true && (
          <button
            className="btn btn-danger close"
            onClick={() => dispatch(deleteMovie(movie._id))}
          >
            Delete
          </button>
        )}

        {user.isAdmin === false && (
          <div>
          <img
          className="like"
          src={like}
          style={{width: '30px', height: '30px'}}
          onClick={handleLikeClick}
          />
          <p className="likes"><strong>{movie.likes}</strong></p>
          </div>
        )}
        
        </section>

      </div>


      <MovieModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        movie={movie}
      />
    </>
  );
};

export default Cards;