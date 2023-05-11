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
    return thunkAPI.rejectWithValue(message)
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

export const setMovieLikes = createAsyncThunk('movies/setLikes', async ({ movieId, likes }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    if (!token) {
      return thunkAPI.rejectWithValue('No hay token disponible')
    }
    await movieService.setLikes(movieId, likes, token)
    return { movieId, likes }
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
      setLikes: (state, action) => {
        const { movieId, likes } = action.payload;
        const index = state.movies.findIndex((movie) => movie._id === movieId);
        if (index !== -1) {
          state.movies[index].likes = likes;
        }
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
      .addCase(setMovieLikes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setMovieLikes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const { movieId, likes } = action.payload
        const index = state.movies.findIndex((movie) => movie._id === movieId)
        if (index !== -1) {
          state.movies[index].likes = likes
        }
      })
      .addCase(setMovieLikes.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
      })
  }
})
//el reset al estar dentro del reducer se exporta como una accion
export const { reset } = movieSlice.actions
export default movieSlice.reducer


