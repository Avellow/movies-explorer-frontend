import Button from "../Button/Button";

function MoviesCard() {
    return (
        <li className='MoviesCard'>
            <div className='MoviesCard__info'>
                <h3 className='MoviesCard__title'>В погоне за Бенкси</h3>
                <p className='MoviesCard__duration'>27 минут</p>
            </div>
            <img
                className='MoviesCard__poster'
                src='https://images.unsplash.com/photo-1574273509043-f94f45e5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
                alt='постер'
            />
            <Button
                text='Сохранить'
                theme='save'
            />
        </li>
    )
}

export default MoviesCard;
