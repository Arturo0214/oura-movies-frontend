import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteMovie, setMovieLikes } from "../features/movies/movieSlice"
import { useSelector } from "react-redux"
import MovieModal from "./MovieModal"
import "../pages/dashboard.css"
import like from '../assets/amor.png'
import star from '../assets/estrella.png'

const Cards = ({ movie }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [likes, setLikes] = useState(movie.likes.length)

  const handleModalOpen = () => {
    setIsModalOpen(true)
    setClicked(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setClicked(false)
  }

  const handleLikeClick = (e) => {
    e.preventDefault()
    const userId = user._id
  
    if (movie.likes.includes(userId)) {
      const newLikes = movie.likes.filter((id) => id !== userId)
      dispatch(setMovieLikes({ movieId: movie._id, likes: newLikes }))
        .then((response) => {
          setLikes(response.payload.likes.length)
        })
    } else {
      dispatch(setMovieLikes({ movieId: movie._id, likes: [...movie.likes, userId] }))
        .then((response) => {
          setLikes(response.payload.likes.length)
        })
    }
  }

  const handleDeleteClick = async () => {
    if (user.isAdmin) {
      dispatch(deleteMovie(movie._id))
    } else {
      alert ("You dont have permission to delete movies.")
    }
  }

  return (
    <>
      <div className={`card ${clicked ? "clicked" : ""}`} style={{ maxWidth: "262px" }}>
        <img src={movie.link} className="img-fluid card-image" style={{objectFit: 'fill'}}onClick={handleModalOpen} />
        <div className="card-body">
          <h4 className="card-title">{movie.title}</h4>
        </div>
        <section>
        <img 
        src={star} 
        style={{width: '30px', height: '30px'}}
        className='star' />  
        <p className="popularity"> <strong>{movie.popularity}</strong></p>
        {user.isAdmin === true && (
          <button
            className="btn gradient-red text-white close"
            onClick={handleDeleteClick}
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
          <p className="likes"><strong>{likes}</strong></p>
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
  )
}

export default Cards