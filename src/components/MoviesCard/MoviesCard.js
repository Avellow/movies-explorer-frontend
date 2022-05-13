import './MoviesCard.css';
import Button from "../Button/Button";
import {useState} from "react";
import {formDuration} from "../../utils/constants";

function MoviesCard(props) {
    const {
        title,
        duration,
        posterLink,
        trailerLink = '',
        listType,
    } = props;

    const [isSaved, setIsSaved] = useState(false); // ВРЕМЕННОЕ РЕШЕНИЕ РЕАКЦИИ на нажатие
    const onClick = () => setIsSaved(!isSaved);

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
                    onClick={onClick}
                />
            )
        } else {
            return (
                <Button
                    text='Сохранить'
                    theme='save'
                    onClick={onClick}
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
