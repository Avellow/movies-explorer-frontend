import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {generateCardsCount, initialCardsCount, MOVIES_SERVER_URL} from "../../utils/constants";
import Button from "../Button/Button";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const {
        movies,
        listType = 'common',
    } = props;

    // потратил много времени на это! ОТРЕФАКТОРЮ СО СВЕЖИМ ВЗГЛЯДОМ ПОЗЖЕ
    const [ showedMovies, setShowedMovies ] = useState(generateCardsCount(window.innerWidth, initialCardsCount(window.innerWidth)));
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth)

    useEffect(() => {

        function handleResize() {
            setTimeout(() => {
                setCurrentWindowWidth(window.innerWidth);
                setShowedMovies(prevState => generateCardsCount(window.innerWidth, prevState.inListCount))
            }, 100)
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [currentWindowWidth])


    function loadMovies() {
        setShowedMovies(prevState => ({
            ...prevState,
            inListCount: prevState.inListCount + prevState.cardIncrement
        }))
    }

    return movies === null
        ? (
            <section className='movies-cards'>
                <h4 className='movies-cards__not-found'>Ничего не найдено</h4>
            </section>
        )
        : (
            <section className='movies-cards'>
                <ul className='movies-cards__list'>
                    {movies
                        .slice(0, showedMovies.inListCount)
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
                {movies.length > showedMovies.inListCount && (
                    <Button
                        theme='loader'
                        text='Ещё'
                        onClick={loadMovies}
                    />)
                }
            </section>
        )
}

export default MoviesCardList;
