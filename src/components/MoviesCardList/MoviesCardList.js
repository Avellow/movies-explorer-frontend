import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {MOVIES_SERVER_URL} from "../../utils/constants";
import Button from "../Button/Button";
import {useState} from "react";

function MoviesCardList(props) {
    const {
        movies = [],
        listType = 'common',
    } = props;

    const [ showedMoviesCount, setShowedMoviesCount ] = useState(3);

    function loadMovies() {
        setShowedMoviesCount((prevState => prevState += 3))
    }

    return (
        <section className='movies-cards'>
            <ul className='movies-cards__list'>
                {movies
                    .slice(0, showedMoviesCount)
                    .map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            title={movie.nameRU}
                            duration={movie.duration}
                            posterLink={`${MOVIES_SERVER_URL}${movie.image.url}`}
                            listType={listType}
                        />)
                    )}
            </ul>
            <Button
                theme='loader'
                text='Ещё'
                onClick={loadMovies}
            />
        </section>
    )
}

export default MoviesCardList;
