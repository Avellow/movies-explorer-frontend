import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
    return (
        <section className='MoviesCardList'>
            <ul className='MoviesCardList__list'>
                <MoviesCard
                    buttonType='delete'
                />
                <MoviesCard
                    isSaved={true}
                />
                <MoviesCard

                />
            </ul>
        </section>
    )
}

export default SavedMovies;
