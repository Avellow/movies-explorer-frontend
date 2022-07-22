import {createSelector} from '@reduxjs/toolkit';
import {shortDuration} from '../utils/constants';

export const selectAllMovies = state => state.movies.movies
export const selectMoviesFilter = state => state.moviesFilters

// фильтрация на уровне Redux. Имеет небольшой сайд эффект - не учитывается регистр
export const selectMoviesByFilter = createSelector(
    [selectAllMovies, selectMoviesFilter],
    (movies, activeFilter) => {
        const { queryString, isShortFilmActive } = activeFilter;
        return movies
            .filter(movie => {
                const lowerCasedQueryString = queryString.toLowerCase();
                const lowerCasedMovieName = movie.nameRU.toLowerCase();

                if (isShortFilmActive) {
                    return lowerCasedMovieName.includes(lowerCasedQueryString)
                        && movie.duration < shortDuration
                }
                return lowerCasedMovieName.includes(lowerCasedQueryString)
            })
    }
)
