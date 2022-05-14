import './MoviesCard.css';
import Button from "../Button/Button";
import {useState} from "react";
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
                <h3 className='movies-card__title'>{ title }</h3>
                <p className='movies-card__duration'>{ formDuration(duration) }</p>
            </div>
            <a
                href={trailerLink}
                target='_blank'
            >
                <img
                    className='movies-card__poster'
                    src={ posterLink }
                    alt='постер'
                />
            </a>

            { generateButton() }
        </li>
    )
}

export default MoviesCard;
