import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";
import SavedMovies from "../SavedMovies/SavedMovies";

function Movies() {
    return (
        <main className='Movies'>
            <SearchForm />
            <SavedMovies />
            <Button
                theme='loader'
                text='Ещё'
            />
        </main>
    )
}

export default Movies;
