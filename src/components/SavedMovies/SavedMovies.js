import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
    const {
        films,
    } = props;

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList
                films={films}
                listType='saved'
            />
        </main>
    )
}

export default SavedMovies;
