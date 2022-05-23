import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {
    checkIdInList,
    CONNECTION_ERROR, delay,
    MOVIES_SERVER_URL,
    shortDuration
} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useCallback, useEffect, useState} from "react";

function Movies(props) {
    const {
        movies,
        isLoading,
        loadMovies,
        isFetchErrored,
        onMovieSave,
        onMovieDelete,
        savedMovies,
    } = props;

    // для того чтобы пользователь видел что поиск выполняется после сабмита его запроса
    // особенно для моментов когда фильмы фильтруются из локального хранилища
    const [isDelayed, setIsDelayed] = useState(false);

    const [
        searchedMovies,
        setSearchedMovies
    ] = useState(null);

    const [
        isToggleChecked,
        setIsToggleChecked
    ] = useState(JSON.parse(localStorage.getItem('isToggleCheckedOnMovies')));

    useEffect(() => {
        setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    }, [])


    const getMovieElementsList = useCallback(() => {
        if (!searchedMovies) return null;
        let moviesToShow = searchedMovies;

        if (isToggleChecked) {
            moviesToShow = moviesToShow.filter(movie => movie.duration <= shortDuration)
        }

        return moviesToShow.map(movie => (
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
                isSaved={checkIdInList(movie.id, savedMovies)}
            />
        ))
    }, [searchedMovies, onMovieSave, onMovieDelete, savedMovies, isToggleChecked])

    function onToggleCheck() {
        setIsToggleChecked(!isToggleChecked);
        localStorage.setItem('isToggleCheckedOnMovies', `${!isToggleChecked}`)
    }

    function handleFilterMovies(value) {
        const processedValue = value.toLowerCase().trim();

        setIsDelayed(true)
        delay(1500)
            .then(() => {
                localStorage.setItem('lastSearchedValueOnMovies', `${processedValue}`);
                if (!movies) {
                    console.log('Загрузка фильмов со стороннего api...')
                    return loadMovies();
                }
            })
            .then((loadedMovies) => {
                const moviesToRender = loadedMovies ? loadedMovies : movies;

                const filteredMovies = moviesToRender.filter(movie =>
                    isToggleChecked
                        ? (movie.nameRU.toLowerCase().includes(processedValue) && movie.duration <= shortDuration)
                        : movie.nameRU.toLowerCase().includes(processedValue))

                localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies))
                setSearchedMovies(filteredMovies)
            })
            .finally(() => setIsDelayed(false))
    }

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={handleFilterMovies}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isToggleChecked}
                isLoading={isLoading || isDelayed}
                storageKey='lastSearchedValueOnMovies'
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading || isDelayed
                ? (<Preloader />)
                : (<MoviesCardList
                        movies={getMovieElementsList()}
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
