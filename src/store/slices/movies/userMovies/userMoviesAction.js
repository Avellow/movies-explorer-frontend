import {createAsyncThunk} from '@reduxjs/toolkit';
import { mainApi } from '../../../../utils/constants';
import {addUserMovie, removeUserMovieLocally} from './userMoviesSlice';


export const getUserMovies = createAsyncThunk(
    'userMovies/getUserMovies',
    async (arg, { rejectWithValue }) => {
        try {
            return await mainApi.getMovies()
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)

export const saveUserMovie = createAsyncThunk(
    'userMovies/saveUserMovie',
    async (movie, { rejectWithValue, dispatch }) => {
        try {
            return await mainApi.saveMovie(movie)
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)

export const removeUserMovie = createAsyncThunk(
    'userMovies/removeUserMovie',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await mainApi.deleteMovie(id)
            return response.data
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)
