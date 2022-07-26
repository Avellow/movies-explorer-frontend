import {createAsyncThunk} from '@reduxjs/toolkit';
import {moviesApi} from '../../../../utils/constants';


export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async (arg, { rejectWithValue }) => {
        try {
            const data = await moviesApi.getFilms()
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
