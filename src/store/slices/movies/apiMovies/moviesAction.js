import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorHandlerOnAsyncThunk, moviesApi} from '../../../../utils/constants';

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async (arg, { rejectWithValue }) => {
        try {
            return await moviesApi.getFilms()
        } catch(error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
        }
    }
)
