import {createSelector} from '@reduxjs/toolkit';
import {shortDuration} from '../../../utils/constants';

export const selectAllMovies = (movieType) => (state) => state.movies[movieType]['data']
export const selectMoviesFilters = (movieType) => (state) => state.movies[movieType][`filters`]

// фильтрация на уровне Redux. Не учитывается регистр
export const selectMoviesByFilter = (movieType) => createSelector(
    [selectAllMovies(movieType), selectMoviesFilters(movieType)],
    (movies, activeFilter) => {
        const { queryString, isShortFilmActive } = activeFilter;
        return movies
            ?.filter(movie => {
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

export const selectIsMoviesLoading = (movieType) => (state) => state.movies[movieType]['loading']
