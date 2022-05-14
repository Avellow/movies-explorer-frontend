import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {checkIdInList, CONNECTION_ERROR, MOVIES_SERVER_URL} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies(props) {
    const {
        movies,
        onSearch,
        isLoading,
        isFetchErrored,
        onMovieSave,
        onMovieDelete,
        savedMovies,
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
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}
            {!isFetchErrored && (isLoading
                ? (<Preloader />)
                : (<MoviesCardList
                        movies={movieElementsList}
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
