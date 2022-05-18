import './MoviesCardList.css';
import { generateCardsCount, initialCardsCount } from "../../utils/constants";
import Button from "../Button/Button";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const {
        movies,
        shouldAllMoviesBeShown = false,
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
                    {movies.slice(0, shouldAllMoviesBeShown ? movies.length : showedMovies.inListCount)}
                </ul>
                {shouldAllMoviesBeShown || (
                    (movies.length > showedMovies.inListCount) && (
                        <Button
                            theme='loader'
                            text='Ещё'
                            onClick={loadMovies}
                        />)
                    )
                }
            </section>
        )
}

export default MoviesCardList;
