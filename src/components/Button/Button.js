import { useCallback } from 'react';

function Button(props) {
    const {
        text = '',
        icon,
        theme = 'default',
        type = 'button',
        onClick,
    } = props;

    function clickHandler(e) {
        e.preventDefault();
        onClick();
    }

    return (
        <button
            className={`button button_theme_${theme}`}
            onClick={clickHandler}
            type={type}
        >
            { text }
            { icon ? <img src={icon} alt='иконка кнопки' /> : '' }
        </button>
    )
}

export default Button;
