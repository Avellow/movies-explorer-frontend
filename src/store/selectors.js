import {createSelector} from '@reduxjs/toolkit';
import {shortDuration} from '../utils/constants';

export const selectAllMovies = state => state.movies.movies
export const selectMoviesFilter = state => state.moviesFilters

export const selectMoviesByFilter = createSelector(
    [selectAllMovies, selectMoviesFilter],
    (movies, activeFilter) => {
        const { queryString, isShortFilmActive } = activeFilter;
        return movies
            .filter(movie => {
                if (isShortFilmActive) {
                    return movie.nameRU.includes(queryString.toLowerCase())
                        && movie.duration < shortDuration
                }
                return movie.nameRU.includes(queryString)
            })
    }
)
