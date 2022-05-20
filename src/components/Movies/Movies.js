import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {checkIdInList, CONNECTION_ERROR, MOVIES_SERVER_URL, shortDuration} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";

function Movies(props) {
    const {
        movies,
        onSearch,
        isLoading,
        isFetchErrored,
        onMovieSave,
        onMovieDelete,
        savedMovies,
        onToggleCheck,
        isToggleChecked,
    } = props;

    const movieElementsList = !movies
        ? null
        : movies.map(movie => (
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

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isToggleChecked}
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading
                ? (<Preloader />)
                : (<MoviesCardList
                        movies={
                            (movieElementsList && isToggleChecked)
                                ? movieElementsList
                                    .filter(movieElement => movieElement.props.duration <= shortDuration)
                                : movieElementsList
                        }
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
