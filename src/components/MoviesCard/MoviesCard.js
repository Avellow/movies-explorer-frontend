import './MoviesCard.css';
import Button from "../Button/Button";
import {formDuration} from "../../utils/constants";

function MoviesCard(props) {
    const {
        title,
        duration,
        posterLink,
        trailerLink = '',
        onButtonClick,
        buttonConfig
    } = props;

    const handleClick = () => {
        onButtonClick()
    };

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
                <Button
                    theme={buttonConfig.theme}
                    text={buttonConfig.text}
                    onClick={handleClick}
                />
            </div>
        </li>
    )
}

export default MoviesCard;
