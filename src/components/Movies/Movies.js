import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";

function Movies() {
    return (
        <main className='Movies'>
            <SearchForm />
            <MoviesCardList />
            <Button
                theme='loader'
                text='Ещё'
            />
        </main>
    )
}

export default Movies;
