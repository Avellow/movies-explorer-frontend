import { useCallback } from 'react';

function Button(props) {
    const {
        text = '',
        theme,
    } = props;

    const generateClassName = useCallback(() => {
        switch (theme) {
            case 'main':
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
            default:
                return '';
        }
    }, [theme]);

    return (
        <button className={`button ${generateClassName()}`}>{ text }</button>
    )
}

export default Button;
