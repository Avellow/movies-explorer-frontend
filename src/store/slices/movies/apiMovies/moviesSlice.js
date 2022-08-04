import {createSlice} from '@reduxjs/toolkit';
import {getMovies} from './moviesAction';
import {beginLoading, setMoviesData, setRequestError} from '../../../../utils/constants';


const initialState = {
    loading: false,
    data: [],
    filters: {
        queryString: '',
        isShortFilmActive: false,
    },
    error: null,
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        changeQueryString(state, { payload }) {
            state.filters.queryString = payload
        },
        toggleShortFilm(state, { payload }) {
            state.filters.isShortFilmActive = payload
        },
    },
    extraReducers: {
        // getting movies from api
        [getMovies.pending]: beginLoading,
        [getMovies.fulfilled]: setMoviesData,
        [getMovies.rejected]: setRequestError,
    }
})

export const { changeQueryString, toggleShortFilm } = moviesSlice.actions;

export default moviesSlice.reducer;
