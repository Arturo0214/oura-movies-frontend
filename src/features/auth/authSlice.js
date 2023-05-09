import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../auth/authService'
import Cookies from 'js-cookie'

const user = Cookies.get(('user'))

const initialState = {
  user: user ? user : null,
  admin: null,
  error: null,
  isLoading: false,
  isSuccess: false,
  isAdminLoggedIn: false,
  isAuthenticated: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const adminLogin = createAsyncThunk('auth/adminLogin', async (adminData, { rejectWithValue }) => {
  try {
    return await authService.adminLogin(adminData)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, getState, rejectWithValue }) => {
  try {
    if (getState().auth.isAdminLoggedIn) {
      await authService.adminLogout()
    } else {
      await authService.logout()
    }
    dispatch(setUser(null))
    dispatch(setAdmin(null))
    return initialState
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      reset: (state) => {
          state.isSuccess = false
          state.isLoading = false
          state.message = ''
          state.error = null
          state.admin = null
          state.user = null
          state.isAdminLoggedIn = null
          state.isAuthenticated = false
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAuthenticated = true
        state.isAdminLoggedIn = false
        state.user = action.payload
        state.admin = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = true
        state.user = null
        state.admin = null
        state.isAdminLoggedIn = false
        state.message = action.payload
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAdminLoggedIn = true
        state.isAuthenticated = true
        state.admin = action.payload
        state.user = null
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isAdminLoggedIn = false
        state.isAuthenticated = false
        state.admin = null
        state.user = null
        state.message = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = false
        if(state.isAdminLoggedIn !== undefined && state.isAdminLoggedIn){
          state.isAdminLoggedIn = false
        }
        state.isAuthenticated = false
        state.user = null
        state.admin = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})
export const { reset } = authSlice.actions
export default authSlice.reducer