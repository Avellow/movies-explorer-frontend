import { useCallback } from 'react';

function Button(props) {
    const {
        text = '',
        theme,
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
            default:
                return '';
        }
    }, [theme]);

    return (
        <button className={`button ${generateClassName()}`}>{ text }</button>
    )
}

export default Button;
