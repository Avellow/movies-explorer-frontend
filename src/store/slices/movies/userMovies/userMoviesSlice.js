import {createSlice} from '@reduxjs/toolkit';
import { getUserMovies } from './userMoviesAction';

const initialState = {
    loading: false,
    data: [],
    filters: {
        queryString: '',
        isShortFilmActive: false,
    },
    error: null,
}

// TODO: объединить логику для фильмов с разных api, чтобы убрать дублирование
// https://github.com/reduxjs/redux-toolkit/issues/715

const userMoviesSlice = createSlice({
    name: 'userMovies',
    initialState,
    reducers: {
        addUserMovie(state, action) {
            state.data.push(action.payload)
        },
        removeUserMovieLocally(state, action) {
            state.data = state.data.filter(movie =>
                movie.movieId !== action.payload.movieId)
        },
        changeQueryStringOnUserMovies(state, { payload }) {
            state.filters.queryString = payload
        },
        toggleShortFilmOnUserMovies(state, { payload }) {
            state.filters.isShortFilmActive = payload
        },
        resetFiltersOnUserMovies(state) {
            state.filters = initialState.filters
        },
    },
    extraReducers: {
        // getting movies from user api
        [getUserMovies.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getUserMovies.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        [getUserMovies.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export const {
    addUserMovie,
    removeUserMovieLocally,
    changeQueryStringOnUserMovies,
    toggleShortFilmOnUserMovies,
    resetFiltersOnUserMovies,
} = userMoviesSlice.actions;

export default userMoviesSlice.reducer;
