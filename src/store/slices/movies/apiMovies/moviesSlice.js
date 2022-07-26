import {createSlice} from '@reduxjs/toolkit';
import {getMovies} from './moviesAction';


const initialState = {
    loading: false,
    data: [],
    filters: {
        queryString: '',
        isShortFilmActive: false,
    },
    error: null,
}

// TODO: объединить логику для фильмов с разных api
// https://github.com/reduxjs/redux-toolkit/issues/715

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
        [getMovies.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getMovies.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        [getMovies.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export const { changeQueryString, toggleShortFilm } = moviesSlice.actions;

export default moviesSlice.reducer;
