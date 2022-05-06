import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const {
        films,
        listType = 'common',
    } = props;

    return (
        <section className='movies-cards'>
            <ul className='movies-cards__list'>
                { films.map((film, i) => (
                    <MoviesCard
                        key={i}
                        title={film.title}
                        duration={film.duration}
                        posterLink={film.posterLink}
                        listType={listType}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;
