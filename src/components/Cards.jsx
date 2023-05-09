import { useDispatch } from "react-redux"
import {deleteMovie} from '../features/movies/movieSlice'
import { useSelector } from "react-redux"
import '../pages/dashboard.css'

const Cards = ({movie}) => {
  const dispatch = useDispatch()
  const {user, admin} = useSelector((state) => state.auth)
  return (
    <>
<>
  <div className="card" style={{maxWidth: '16rem'}}>
    <img src={movie.link} className="img-fluid"/>
    <div className="card-body">
      <h4 className="card-title"> {movie.title}</h4>
    </div>
    <p> {movie.popularity} </p>
    
    { admin && (
      <button className="btn btn-danger close" onClick={() => dispatch(deleteMovie(movie._id))}>
        Delete
      </button>
    )}
  </div>
</>
    </>
  )
}

export default Cards