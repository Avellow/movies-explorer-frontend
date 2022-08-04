import {combineReducers} from 'redux';
import apiMoviesReducer from './apiMovies/moviesSlice'
import userMoviesReducer from './userMovies/userMoviesSlice'

export default combineReducers({
    apiMovies: apiMoviesReducer,
    userMovies: userMoviesReducer,
})
