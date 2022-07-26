import {combineReducers} from 'redux';
import {moviesDataReducer} from '../../reducers/movies/data/movies-data-reducer';
import {moviesFiltersReducer} from '../../reducers/movies/filters/movies-filter-reducer';
import apiMoviesReducer from './apiMovies/moviesSlice'
import userMoviesReducer from './userMovies/userMoviesSlice'

export default combineReducers({
    apiMovies: apiMoviesReducer,
    userMovies: userMoviesReducer,
})

// TODO: рефакторинг при помощи слайсов из RTK
/*

export const moviesReducer = combineReducers({
    data: moviesDataReducer,
    filters: moviesFiltersReducer,
})

export function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const { name } = action
        const isInitializationCall = state === undefined
        if (name !== reducerName && !isInitializationCall) return state

        return reducerFunction(state, action)
    }
}

export default combineReducers({
    apiMovies: createNamedWrapperReducer(moviesReducer, 'apiMovies'),
    userMovies: createNamedWrapperReducer(moviesReducer, 'userMovies'),
})
*/
