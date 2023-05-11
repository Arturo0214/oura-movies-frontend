import axios from 'axios'

const API_URL = 'https://aggressive-pear-shoulder-pads.cyclic.app/api/movies/'

//crear una nueva pelicula
const createMovie = async (movieData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.post(API_URL, movieData, config)
  return response.data
}

//obtener todas las peliculas
const getMovies = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//borramos una pelicula
const deleteMovie = async (id, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.delete(API_URL + id, config) 
  return response.data
}
const setLikes = async (id, likes, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`${API_URL}${id}/like`, { likes }, config)
  return response.data
}


const movieService = {
  getMovies,
  deleteMovie,
  createMovie,
  setLikes
}
export default movieService