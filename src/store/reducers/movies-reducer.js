import {getMoviesFromLocalStorage} from '../../localStorage/movies';

const defaultState = {
    movies: getMoviesFromLocalStorage() || [],
}

const ADD_MOVIES = 'thirdParty/ADD_MOVIES'

export const moviesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case(ADD_MOVIES):
            return { ...state, movies: [ ...action.payload ] }
        default:
            return state;
    }
}

export const addMovies = (movies) => ({ type: ADD_MOVIES, payload: movies })
