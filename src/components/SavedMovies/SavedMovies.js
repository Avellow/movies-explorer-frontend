import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {CONNECTION_ERROR} from "../../utils/constants";
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

    function handleFilterMovies(value) {
        setSearchValue(value.toLowerCase())
    }

    const movieElementsList = movies
        .filter(movie => movie.nameRU.toLowerCase().includes(searchValue))
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
            />

            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}

            {!isFetchErrored && (isLoading
                ? (<Preloader/>)
                : (<MoviesCardList
                      movies={movieElementsList.length ? movieElementsList : null}
                      listType='saved'
                   />)
                )
            }
        </main>
    )
}

export default SavedMovies;
