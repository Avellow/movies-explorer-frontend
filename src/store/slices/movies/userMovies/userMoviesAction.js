import {createAsyncThunk} from '@reduxjs/toolkit';
import { mainApi } from '../../../../utils/constants';
import {addUserMovie, removeUserMovieLocally} from './userMoviesSlice';


export const getUserMovies = createAsyncThunk(
    'userMovies/getUserMovies',
    async (arg, { rejectWithValue }) => {
        try {
            const data = await mainApi.getMovies()
            return data
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const saveUserMovie = createAsyncThunk(
    'userMovies/saveUserMovie',
    async (movie, { rejectWithValue, dispatch }) => {
        try {
            const response = await mainApi.saveMovie(movie)
            await dispatch(addUserMovie(response))
        } catch(error) {
            // TODO вынести в отдельную переменную и переиспользовать
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const removeUserMovieFromServer = createAsyncThunk(
    'userMovies/removeUserMovie',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await mainApi.deleteMovie(id)

            dispatch(removeUserMovieLocally(response.data))
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)
