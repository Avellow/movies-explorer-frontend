import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {checkIdInList, CONNECTION_ERROR, MOVIES_SERVER_URL, shortDuration} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useCallback} from "react";

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

    const getMovieElementsList = useCallback(() => {
        const result = !movies
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
        if (isToggleChecked) {
            const shortFilms = result.filter(movieElement => movieElement.props.duration <= shortDuration);
            return shortFilms.length ? shortFilms : null;
        }
        return result;
    }, [movies, isToggleChecked, onMovieSave, onMovieDelete, savedMovies])


    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onSearch}
                onToggleCheck={onToggleCheck}
                isToggleChecked={isToggleChecked}
                isLoading={isLoading}
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading
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
