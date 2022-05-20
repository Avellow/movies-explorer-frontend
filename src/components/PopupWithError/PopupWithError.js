import './PopupWithError.css'
import Button from "../Button/Button";
import {NavLink} from "react-router-dom";

function PopupWithError(props) {
    const {
        onClose,
        isOpened,
        errorText,
        onReturn,
    } = props;

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <section
            className={`error-popup${isOpened ? ' error-popup_opened' : ''}`}
            onClick={handleOverlay}
        >
            <div className='error-popup__container'>
                <Button theme='close' onClick={onClose}/>
                <h4 className='error-popup__title'>Ошибка!</h4>
                <p className='error-popup__subtitle'>{errorText}</p>
                <NavLink
                    className='error-popup__link'
                    to='/'
                    onClick={onReturn}
                >Вернуться на главную страницу</NavLink>
            </div>
        </section>
    )
}

export default PopupWithError;
