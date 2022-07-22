import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit';
import {moviesReducer} from './reducers/movies-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {moviesFiltersReducer} from './reducers/movies-filters-reducer';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        moviesFilters: moviesFiltersReducer,
    }
})
