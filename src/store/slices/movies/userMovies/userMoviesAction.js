import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorHandlerOnAsyncThunk, mainApi} from '../../../../utils/constants';

export const getUserMovies = createAsyncThunk(
    'userMovies/getUserMovies',
    async (arg, { rejectWithValue }) => {
        try {
            return await mainApi.getMovies()
        } catch(error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
        }
    }
)

export const saveUserMovie = createAsyncThunk(
    'userMovies/saveUserMovie',
    async (movie, { rejectWithValue }) => {
        try {
            return await mainApi.saveMovie(movie)
        } catch(error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
        }
    }
)

export const removeUserMovie = createAsyncThunk(
    'userMovies/removeUserMovie',
    async (id, { rejectWithValue }) => {
        try {
            const response = await mainApi.deleteMovie(id)
            return response.data
        } catch(error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
        }
    }
)
