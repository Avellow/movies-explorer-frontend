import './MoviesCard.css';
import Button from "../Button/Button";
import {formDuration} from "../../utils/constants";

function MoviesCard(props) {
    const {
        title,
        id,
        duration,
        posterLink,
        trailerLink = '',
        listType,
        onMovieSave,
        onMovieDelete,
        movieProps,
        isSaved
    } = props;

    const handleClick = () => {
        isSaved
            ? onMovieDelete(id)
            : onMovieSave(movieProps)
    };

    function generateButton() {
        if (listType === 'saved') {
            return (
                <Button
                    theme='delete'
                    onClick={handleClick}
                />
            )
        } else if (isSaved) {
            return (
                <Button
                    theme='saved'
                    onClick={handleClick}
                />
            )
        } else {
            return (
                <Button
                    text='Сохранить'
                    theme='save'
                    onClick={handleClick}
                />
            )
        }
    }

    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <h3
                    className='movies-card__title'
                >
                    { title.trim() }
                </h3>
                <span className='movies-card__tooltip'>{ title.trim() }</span>
                <p className='movies-card__duration'>{ formDuration(duration) }</p>
            </div>
            <a
                className='movies-card__poster-link'
                href={trailerLink}
                target='_blank'
                rel="noreferrer"
            >
                <img
                    className='movies-card__poster'
                    src={ posterLink }
                    alt='постер'
                />
            </a>
            <div className='movies-card__btn-container'>
                { generateButton() }
            </div>
        </li>
    )
}

export default MoviesCard;
