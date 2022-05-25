import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CONNECTION_ERROR, delay, shortDuration} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import {useCallback, useState} from "react";

function SavedMovies(props) {
    const {
        movies,
        onMovieDelete,
        isLoading,
        isFetchErrored,
    } = props;

    // для того чтобы пользователь видел что поиск выполняется после сабмита его запроса
    // особенно для моментов когда фильмы фильтруются из локального хранилища
    const [isDelayed, setIsDelayed] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [isToggleChecked, setIsToggleChecked] = useState(false);

    const getFilteredMovies = useCallback(() => {
        return movies
            .filter(movie => {
                return isToggleChecked
                    ? (movie.nameRU.toLowerCase().includes(searchValue) && movie.duration <= shortDuration)
                    : movie.nameRU.toLowerCase().includes(searchValue)
            })
            .map(movie => (
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
                )
            )
    }, [movies, searchValue, isToggleChecked, onMovieDelete])

    function onToggleCheck() {
        setIsToggleChecked(!isToggleChecked);
    }

    function handleFilterMovies(value) {
        const processedValue = value.toLowerCase().trim();

        setIsDelayed(true);
        delay(500)
            .then(() => setSearchValue(processedValue))
            .finally(() => setIsDelayed(false))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={handleFilterMovies}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isToggleChecked}
                isLoading={isLoading || isDelayed}
            />

            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading || isDelayed
                ? (<Preloader/>)
                : (<MoviesCardList
                      movies={getFilteredMovies()}
                      listType='saved'
                      shouldAllMoviesBeShown={true}
                   />)
                )
            }
        </main>
    )
}

export default SavedMovies;
