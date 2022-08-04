import './MoviesCardList.css';
import {checkIdInList, generateCardsCount, getInitialChunkSize} from '../../utils/constants';
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    const {
        movies,
        savedMovies = [],
        onMovieSave,
        onMovieDelete,
        additionalCardImgDomain = '',
        type, // apiMovies or userMovies
        shouldAllMoviesBeShown = false,
    } = props;

    const [
        showedMovies,
        setShowedMovies
    ] = useState(generateCardsCount(window.innerWidth, getInitialChunkSize(window.innerWidth)));

    // реакция на изменение ширины экрана
    useEffect(() => {

        function handleResize() {
            setTimeout(() => {
                setShowedMovies(prevState => generateCardsCount(window.innerWidth, prevState.inListCount))
            }, 100)
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [])

    function loadMovies() {
        setShowedMovies(prevState => ({
            ...prevState,
            inListCount: prevState.inListCount + prevState.cardIncrement
        }))
    }

    // создает настройки для кнопки в зависимости от типа списка
    function generateButtonConfig(type, isSaved = false) {
        if (type === 'apiMovies' && isSaved) {
            return { text: '', theme: 'apiRemovable' }
        } else if (type === 'apiMovies') {
            return { text: 'Сохранить', theme: 'apiSavable'}
        } else if (type === 'userMovies') {
            return { text: '', theme: 'userRemovable' }
        } else {
            return { text: '', theme: '' }
        }
    }

    function renderMovieCard(movie) {
        const isSaved = type === 'userMovies' || checkIdInList(movie.id, savedMovies)
        const imgUrl = type === 'userMovies' ? movie.image : `${additionalCardImgDomain}${movie.image.url}`

         return (
            <MoviesCard
                key={movie.id || movie.movieId}
                id={movie.id || movie.movieId}
                title={movie.nameRU}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                posterLink={imgUrl}
                onButtonClick={ isSaved ? onMovieDelete(movie) : onMovieSave(movie)}
                buttonConfig={generateButtonConfig(type, isSaved)}
            />
        )
    }

    if (!movies) return null;

    return !movies.length
        ? (
            <section className='movies-cards'>
                <h4 className='movies-cards__not-found'>Ничего не найдено</h4>
            </section>
        )
        : (
            <section className='movies-cards'>
                <ul className='movies-cards__list'>
                    {
                        movies
                            .slice(0, shouldAllMoviesBeShown ? movies.length : showedMovies.inListCount)
                            .map(renderMovieCard)
                    }
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
