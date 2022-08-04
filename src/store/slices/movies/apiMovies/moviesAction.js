import {createAsyncThunk} from '@reduxjs/toolkit';
import {moviesApi} from '../../../../utils/constants';

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async (arg, { rejectWithValue }) => {
        try {
            return await moviesApi.getFilms()
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)
