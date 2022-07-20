import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit';
import {moviesReducer} from './reducers/movies-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    movies: moviesReducer,
})

export const store = configureStore(
    {
        reducer: rootReducer,
        devTools: true
    }
)
