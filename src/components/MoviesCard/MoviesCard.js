import Button from "../Button/Button";

function MoviesCard(props) {
    const {
        isSaved,
        onSave,
        onDelete,
        buttonType,
        title,
        duration,
        posterLink,
    } = props;

    function generateButton() {
        if (buttonType === 'delete') {
            return (
                <Button
                    theme={buttonType}
                />
            )
        } else if (isSaved) {
            return (
                <Button
                    theme='saved'
                />
            )
        } else {
            return (
                <Button
                    text='Сохранить'
                    theme='save'
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
