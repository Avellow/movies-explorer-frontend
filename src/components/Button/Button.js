import './Button.css';
import { useCallback } from 'react';

function Button(props) {
    const {
        text,
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
            default:
                return '';
        }
    }, [theme]);

    return (
        <button className={`button ${generateClassName()}`}>{ text }</button>
    )
}

export default Button;
