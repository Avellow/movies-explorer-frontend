import {createSlice} from '@reduxjs/toolkit';
import {getUserMovies, removeUserMovie, saveUserMovie} from './userMoviesAction';
import {
    beginLoading,
    pushMovieData,
    removeMovieFromStore,
    setMoviesData,
    setRequestError
} from '../../../../utils/constants';

const initialState = {
    loading: false,
    data: [],
    filters: {
        queryString: '',
        isShortFilmActive: false,
    },
    error: null,
}

// может пригодиться
// https://github.com/reduxjs/redux-toolkit/issues/715

const userMoviesSlice = createSlice({
    name: 'userMovies',
    initialState,
    reducers: {
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
        [getUserMovies.pending]: beginLoading,
        [getUserMovies.fulfilled]: setMoviesData,
        [getUserMovies.rejected]: setRequestError,

        // saving user movie
        [saveUserMovie.pending]: beginLoading,
        [saveUserMovie.fulfilled]: pushMovieData,
        [saveUserMovie.rejected]: setRequestError,

        // removing user movie
        [removeUserMovie.pending]: beginLoading,
        [removeUserMovie.fulfilled]: removeMovieFromStore,
        [removeUserMovie.rejected]: setRequestError,
    }
})

export const {
    changeQueryStringOnUserMovies,
    toggleShortFilmOnUserMovies,
    resetFiltersOnUserMovies,
} = userMoviesSlice.actions;

export default userMoviesSlice.reducer;
