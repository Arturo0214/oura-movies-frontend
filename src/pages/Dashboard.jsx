import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import './dashboard.css'
import Spinner from "../components/Spinner"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Cards from "../components/Cards"
import {getMovies, reset} from '../features/movies/movieSlice'
import buscar from '../assets/lupa.png'
import movie from '../assets/camara.png'


const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  const {movies, isLoading, error, message} = useSelector((state) => state.movie) 
  const [searchTerm, setSearchTerm] = useState('')
  
  //useEffect para users
  useEffect(() => {
    if (error) {
      toast.error(message)
    }
    if (!user) {
        navigate('/login')
    } else {
      dispatch(getMovies())
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, error, message, dispatch])
  
  // método que actualiza la cadena de búsqueda actual
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  // filtrar las películas de la lista según la cadena de búsqueda actual
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  })


  if (isLoading) {
    return <Spinner/>
  } 

  return (
    <>
      <>
      <Navbar/>
      </>
      <>
      <div className='titulo'>
        <div className="head">  
          <h3 className="titulo-2">Search your favorite movie</h3>
          <img src={movie} alt="" />
        </div>
        <form className="head-1">
        <div className="searching">
          <input 
          className="form-control me-sm-2 search" 
          type="search" 
          placeholder="Enter your movie"
          value={searchTerm}
          onChange={handleSearch} />
          <button className="btn my-2 my-sm-0" type="submit">
          <img src={buscar}/>
        </button>
        </div>
        </form>
      </div>

      </>
      <section className="contenido col">
        {filteredMovies.length > 0 ? (
          <div className="movies row">
            {filteredMovies.map((movie) => (
              <Cards key={movie._id} movie={movie}/>
            ))}
          </div>
        ) : (
          <h4>No movies found</h4>
        )}
      </section>

      <Footer/>

      </>
  )
  
}
export default Dashboard