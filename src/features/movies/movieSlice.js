import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from './movieService';

const initialState = {
  movies: [],
  error: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//crear una nueva pelicula
export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    if (!user || !user.isAdmin) {
      throw new Error('No tienes permisos para crear una nueva película')
    }
    const token = user.token
    return await movieService.createMovie(movieData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

//mostrar peliculas
export const getMovies = createAsyncThunk('movies/get', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth
    const token = state.user.token
    if (!token) {
      return thunkAPI.rejectWithValue('No hay token disponible')
    }
    return await movieService.getMovies(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// borrar una pelicula existente
export const deleteMovie = createAsyncThunk('movies/delete', async (movieId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user || !user.isAdmin) {
      throw new Error('No tienes permisos para borrar películas');
    }
    const token = user.token;
    await movieService.deleteMovie(movieId, token)
    return movieId
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const movieSlice = createSlice ({
  name: 'movie',
  initialState,
  reducers: {
      reset: (state) => initialState
  },
  extraReducers: (builder) => {
      builder
      .addCase(createMovie.pending, (state) => {
          state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.movies.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action) => {
          state.isLoading = false
          state.error = true
          state.message = action.payload
      })
      .addCase(getMovies.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.movies = action.payload
      })
      .addCase(getMovies.rejected, (state, action) => {
          state.isLoading = false
          state.error = true
          state.message = action.payload
      })
      .addCase(deleteMovie.pending, (state) => {
          state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.movies = state.movies.filter((movie) => movie._id !== action.payload)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
          state.isLoading = false
          state.error = true
          state.message = action.payload
      })
  }
})

//el reset al estar dentro del reducer se exporta como una accion
export const { reset } = movieSlice.actions
export default movieSlice.reducer


