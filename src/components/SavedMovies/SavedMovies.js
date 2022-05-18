import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CONNECTION_ERROR, shortDuration} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";

function SavedMovies(props) {
    const {
        movies,
        onMovieDelete,
        isLoading,
        isFetchErrored,
    } = props;

    const [searchValue, setSearchValue] = useState('')
    const [
        isShortFilmToggleChecked,
        setIsShortFilmToggleChecked
    ] = useState(JSON.parse(localStorage.getItem('isShortFilmToggleChecked')));

    function onToggleCheck() {
        setIsShortFilmToggleChecked(!isShortFilmToggleChecked);
        localStorage.setItem('isShortFilmToggleChecked', `${!isShortFilmToggleChecked}`)
    }

    function handleFilterMovies(value) {
        setSearchValue(value.toLowerCase())
    }

    const movieElementsList = movies
        .filter(movie => {
            return isShortFilmToggleChecked
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

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={handleFilterMovies}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isShortFilmToggleChecked}
            />

            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading
                ? (<Preloader/>)
                : (<MoviesCardList
                      movies={movieElementsList.length ? movieElementsList : null}
                      listType='saved'
                      shouldAllMoviesBeShown={true}
                   />)
                )
            }
        </main>
    )
}

export default SavedMovies;
