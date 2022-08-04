import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {
    CONNECTION_ERROR, delay,
    MOVIES_SERVER_URL,
} from "../../utils/constants";
import {useDispatch, useSelector} from 'react-redux';

import {
    selectAllMovies,
    selectIsMoviesLoading,
    selectMoviesByFilter, selectMoviesError,
    selectMoviesFilters
} from '../../store/selectors/movies/movies-selectors';
import {getMovies} from '../../store/slices/movies/apiMovies/moviesAction';
import {changeQueryString, toggleShortFilm} from '../../store/slices/movies/apiMovies/moviesSlice';

function Movies(props) {
    const {
        onMovieSave,
        onMovieDelete,
    } = props;

    const dispatch = useDispatch();

    const { queryString, isShortFilmActive } = useSelector(selectMoviesFilters('apiMovies'))
    const filteredMovies = useSelector(selectMoviesByFilter('apiMovies'))
    const movies = useSelector(selectAllMovies('apiMovies'))
    const isMoviesLoading = useSelector(selectIsMoviesLoading('apiMovies'))
    const error = useSelector(selectMoviesError('apiMovies'))

    const savedMovies = useSelector(selectAllMovies('userMovies'))

    function onToggleCheck() {
        dispatch(toggleShortFilm(!isShortFilmActive))
    }

    async function onMovieSearch(value) {
        if (!movies || movies.length === 0) {
            await dispatch(getMovies())
        }
        dispatch(changeQueryString(value))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onMovieSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isShortFilmActive}
                isLoading={isMoviesLoading}
                storageKey='queryString'
                defaultValue={queryString}
            />
            {error && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!error && (isMoviesLoading
                ? (<Preloader />)
                : (<MoviesCardList
                        movies={filteredMovies}
                        savedMovies={savedMovies}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                        type={'apiMovies'}
                        additionalCardImgDomain={MOVIES_SERVER_URL}
                    />)
                )
            }
        </main>
    )
}

export default Movies;
