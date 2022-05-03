import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const {
        films,
    } = props;

    return (
        <section className='MoviesCardList'>
            <ul className='MoviesCardList__list'>
                { films.map((film, i) => (
                    <MoviesCard
                        key={i}
                        title={film.title}
                        duration={film.duration}
                        posterLink={film.posterLink}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;
