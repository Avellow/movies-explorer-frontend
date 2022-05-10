import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
    const {
        movies = [],
    } = props;

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList
                movies={ movies }
            />
        </main>
    )
}

export default Movies;
