import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";

function Movies(props) {
    const {
        films,
    } = props;

    return (
        <main className='Movies'>
            <SearchForm />
            <MoviesCardList
                films={films}
            />
            <Button
                theme='loader'
                text='Ещё'
            />
        </main>
    )
}

export default Movies;
