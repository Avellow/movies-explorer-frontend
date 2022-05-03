import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
    const {
        films,
    } = props;

    return (
        <main className='Movies'>
            <SearchForm />
            <MoviesCardList
                films={films}
            />
        </main>
    )
}

export default SavedMovies;
