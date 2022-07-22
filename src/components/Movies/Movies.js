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
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeQueryStringAction, toggleShortFilmSwitcherAction} from '../../store/reducers/movies-filters-reducer';
import {selectAllMovies, selectMoviesByFilter, selectMoviesFilter} from '../../store/selectors';
import {
    setToLocalStorage
} from '../../localStorage/movies-filter';

function Movies(props) {
    const {
        isLoading,
        loadMovies,
        isFetchErrored,
        onMovieSave,
        onMovieDelete,
        savedMovies,
    } = props;

    const dispatch = useDispatch();
    const { isShortFilmActive } = useSelector(selectMoviesFilter)
    const filteredMovies = useSelector(selectMoviesByFilter)
    const movies = useSelector(selectAllMovies)

    // искусственная задержка при фильтрации, временно не используется
    const [isDelayed, setIsDelayed] = useState(false);

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
            isSaved={false} // checkIdInList(movie.id, savedMovies)
        />
    )) || []

    function onToggleCheck() {
        setToLocalStorage('isToggleChecked', !isShortFilmActive)
        dispatch(toggleShortFilmSwitcherAction(!isShortFilmActive))
    }

    async function onMovieSearch(value) {
        if (!movies || movies.length === 0) {
            await loadMovies();
        }
        setToLocalStorage('queryString', value)
        dispatch(changeQueryStringAction(value))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onMovieSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isShortFilmActive}
                isLoading={isLoading || isDelayed}
                storageKey='queryString'
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading || isDelayed
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
