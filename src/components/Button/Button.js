import { useCallback } from 'react';

function Button(props) {
    const {
        text = '',
        icon,
        theme,
        onClick,
    } = props;

    const generateClassName = useCallback(() => {
        switch (theme) {
            case 'main':  // перепишу ЭТОТ АД НА ТЕРНАРНИК с готовым в классе theme_${theme}
                return 'button_theme_main';
            case 'light':
                return 'button_theme_light';
            case 'light-bordered':
                return 'button_theme_light-bordered';
            case 'search':
                return 'button_theme_search';
            case 'save':
                return 'button_theme_save';
            case 'auth':
                return 'button_theme_auth';
            case 'loader':
                return 'button_theme_loader';
            case 'acc':
                return 'button_theme_acc';
            case 'burger':
                return 'button_theme_burger';
            case 'close':
                return 'button_theme_close';
            case 'delete':
                return 'button_theme_delete';
            case 'saved':
                return 'button_theme_saved';
            default:
                return '';
        }
    }, [theme]);

    return (
        <button
            className={`button ${generateClassName()}`}
            onClick={onClick}
        >
            { text }
            { icon ? <img src={icon} alt='иконка кнопки' /> : '' }
        </button>
    )
}

export default Button;
