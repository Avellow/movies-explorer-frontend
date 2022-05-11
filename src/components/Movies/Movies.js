import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {CONNECTION_ERROR} from "../../utils/constants";

function Movies(props) {
    const {
        movies,
        onSearch,
        isLoading,
        isFetchErrored,
    } = props;

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onSearch}
            />
            {isFetchErrored && (<h4 className='movies-cards__not-found'>{CONNECTION_ERROR}</h4>)}
            {!isFetchErrored && (isLoading ? <Preloader /> : <MoviesCardList movies={movies} />)}
        </main>
    )
}

export default Movies;
