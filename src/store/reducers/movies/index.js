import {combineReducers} from 'redux';
import {moviesDataReducer} from './data/movies-data-reducer';
import {moviesFiltersReducer} from './filters/movies-filter-reducer';

export const moviesReducer = combineReducers({
    data: moviesDataReducer, // TODO: refactor to moviesDataReducer
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
