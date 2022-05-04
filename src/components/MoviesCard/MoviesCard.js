import Button from "../Button/Button";
import {useState} from "react";

function MoviesCard(props) {
    const {
        onSave,
        onDelete,
        buttonType,
        title,
        duration,
        posterLink,
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
        <li className='MoviesCard'>
            <div className='MoviesCard__info'>
                <h3 className='MoviesCard__title'>{ title }</h3>
                <p className='MoviesCard__duration'>{ duration }</p>
            </div>
            <img
                className='MoviesCard__poster'
                src={ posterLink }
                alt='постер'
            />
            { generateButton() }
        </li>
    )
}

export default MoviesCard;
