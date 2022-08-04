import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {CONNECTION_ERROR} from '../../utils/constants';
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from 'react-redux';
import {
    selectIsMoviesLoading,
    selectMoviesByFilter, selectMoviesError,
    selectMoviesFilters
} from '../../store/selectors/movies/movies-selectors';
import {useEffect} from 'react';
import {
    changeQueryStringOnUserMovies, resetFiltersOnUserMovies,
    toggleShortFilmOnUserMovies
} from '../../store/slices/movies/userMovies/userMoviesSlice';

function SavedMovies(props) {
    const {
        onMovieDelete,
    } = props;

    const dispatch = useDispatch();

    const filteredUserMovies = useSelector(selectMoviesByFilter('userMovies'))
    const { isShortFilmActive } = useSelector(selectMoviesFilters('userMovies'))
    const isUserMoviesLoading = useSelector(selectIsMoviesLoading('userMovies'))

    const error = useSelector(selectMoviesError('userMovies'))

    // при монтировании очищает значение фильтров в хранилище
    useEffect(() => {
        dispatch(resetFiltersOnUserMovies())
    }, [])

    function onToggleCheck() {
        dispatch(toggleShortFilmOnUserMovies(!isShortFilmActive))
    }

    function onMovieSearch(value) {
        dispatch(changeQueryStringOnUserMovies(value))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onMovieSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isShortFilmActive}
                isLoading={isUserMoviesLoading}
            />

            {error && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!error && (isUserMoviesLoading
                ? (<Preloader/>)
                : (<MoviesCardList
                      movies={filteredUserMovies}
                      onMovieDelete={onMovieDelete}
                      type={'userMovies'}
                      shouldAllMoviesBeShown={true}
                   />)
                )
            }
        </main>
    )
}

export default SavedMovies;
