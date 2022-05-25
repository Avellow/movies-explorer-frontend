import './Button.css';

function Button(props) {
    const {
        text = '',
        icon,
        theme = 'default',
        type = 'button',
        onClick,
        ...buttonProps
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
            {...buttonProps}
        >
            { text }
            { icon ? <img src={icon} alt='иконка кнопки' /> : '' }
        </button>
    )
}

export default Button;
