import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CONNECTION_ERROR} from '../../utils/constants';
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from 'react-redux';
import {selectMoviesByFilter, selectMoviesFilter} from '../../store/selectors/movies/movies-selectors';
import {
    changeQueryStringAction,
    toggleShortFilmSwitcherAction
} from '../../store/reducers/movies/filters/movies-filter-reducer';
import {useEffect} from 'react';

function SavedMovies(props) {
    const {
        onMovieDelete,
        isLoading,
        isFetchErrored,
    } = props;
    // TODO: объединить компоненты фильмов и сохраненных фильмов ???
    //redux
    const dispatch = useDispatch();
    const filteredUserMovies = useSelector(selectMoviesByFilter('userMovies'))
    const { isShortFilmActive } = useSelector(selectMoviesFilter('userMovies'))

    // при unmount очищает значение поисковой строки в хранилище
    useEffect(() => () => {
        dispatch(changeQueryStringAction('userMovies', ''))
    }, [])

    const moviesElements = filteredUserMovies.map(movie => (
        <MoviesCard
            key={movie._id}
            id={movie.movieId}
            title={movie.nameRU}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            posterLink={movie.image}
            movieProps={movie}
            onMovieDelete={onMovieDelete}
            isSaved={true}
            listType='saved'
        />
    )) || [] // TODO: refactor this
    // end redux

    function onToggleCheck() {
        dispatch(toggleShortFilmSwitcherAction('userMovies', !isShortFilmActive))
    }

    function onMovieSearch(value) {
        dispatch(changeQueryStringAction('userMovies', value))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onMovieSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isShortFilmActive}
                isLoading={isLoading}
            />

            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading
                ? (<Preloader/>)
                : (<MoviesCardList
                      movies={moviesElements}
                      listType='saved'
                      shouldAllMoviesBeShown={true}
                   />)
                )
            }
        </main>
    )
}

export default SavedMovies;
