import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './dashboard.css'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Filters from '../components/Filters'
import { getMovies, reset } from '../features/movies/movieSlice'
import movie from '../assets/camara.png'
import buscar from '../assets/lupa.png';

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { movies, isLoading, error, message } = useSelector((state) => state.movie)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState(null)

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
    setShowAll(true)
  }
  const handleShowAll = () => {
    setShowAll(true)
  }

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre)
    setShowAll(false)
  }

  const filteredMovies = movies
    .filter((movie) => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .filter((movie) => {
      return showAll || movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .filter((movie) => {
      return !selectedGenre || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      } else if (sortBy === 'popularity') {
        return sortOrder === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity
      } else {
        return 0
      }
    })

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <>
        <Navbar />
      </>
      <>
        <Filters
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showAll={showAll}
          setShowAll={setShowAll}
          handleShowAll={handleShowAll}
          handleGenreFilter={handleGenreFilter}
        />
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
      <>
      <div className="movie-genre">
      <div className='filters-genre'>
        <h3 className='filter-title'>Movies Genre</h3>
        <button className="btn btn-danger" onClick={() => handleGenreFilter('Action')}>Action</button>
        <br />
        <button className="btn btn-primary" onClick={() => handleGenreFilter('Thriller')}>Thriller</button>
        <br />
        <button className="btn btn-warning" onClick={() => handleGenreFilter('Fantasy')}>Fantasy</button>
        <br />
        <button className="btn btn-info" onClick={() => handleGenreFilter('Kids')}>Kids</button>
        <br />
        <button className="btn btn-dark" onClick={() => handleGenreFilter('Sports')}>Sports</button>
        <br />
        <button className="btn btn-success" onClick={() => handleGenreFilter('Comedy')}>Comedy</button>
      </div>
    </div>
    </>
    <>
      <section className="contenido col">
        {filteredMovies.length > 0 ? (
          <div className="movies row">
            {filteredMovies.map((movie) => (
              <Cards key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <h4>No movies found</h4>
        )}
      </section>

    <> 
      <Footer />
    </> 
    </>
    </>
  );
}
export default Dashboard