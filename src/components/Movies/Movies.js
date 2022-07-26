import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {
    checkIdInList,
    CONNECTION_ERROR, delay,
    MOVIES_SERVER_URL,
} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useDispatch, useSelector} from 'react-redux';

import {
    selectAllMovies,
    selectIsMoviesLoading,
    selectMoviesByFilter,
    selectMoviesFilters
} from '../../store/selectors/movies/movies-selectors';
import {getMovies} from '../../store/slices/movies/apiMovies/moviesAction';
import {changeQueryString, toggleShortFilm} from '../../store/slices/movies/apiMovies/moviesSlice';

function Movies(props) {
    const {
        isFetchErrored,
        onMovieSave,
        onMovieDelete,
    } = props;

    const dispatch = useDispatch();
    const { queryString, isShortFilmActive } = useSelector(selectMoviesFilters('apiMovies'))
    const filteredMovies = useSelector(selectMoviesByFilter('apiMovies'))
    const movies = useSelector(selectAllMovies('apiMovies'))
    const isMoviesLoading = useSelector(selectIsMoviesLoading('apiMovies'))
    const savedMovies = useSelector(selectAllMovies('userMovies'))

    // TODO: перенести генерацию элементов на уровень компонента MoviesCardList
    const newGetMoviesElementsList = filteredMovies.map(movie => (
        <MoviesCard
            key={movie.id}
            id={movie.id}
            title={movie.nameRU}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            posterLink={`${MOVIES_SERVER_URL}${movie.image.url}`}
            movieProps={movie}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            isSaved={checkIdInList(movie.id, savedMovies)} // checkIdInList(movie.id, savedMovies)
        />
    )) || []

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
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isMoviesLoading
                ? (<Preloader />)
                : (<MoviesCardList
                        movies={newGetMoviesElementsList}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                        savedMovies={savedMovies}
                    />)
                )
            }
        </main>
    )
}

export default Movies;
