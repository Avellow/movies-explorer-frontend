import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <section className='MoviesCardList'>
            <ul className='MoviesCardList__list'>
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
        </section>
    )
}

export default MoviesCardList;
