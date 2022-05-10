import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
    const {
        movies = [],
        onSearch,
    } = props;

    return (
        <main className='movies'>
            <SearchForm
                onSubmit={onSearch}
            />
            <MoviesCardList
                movies={ movies }
            />
        </main>
    )
}

export default Movies;
