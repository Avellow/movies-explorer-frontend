import style from './AuthHint.module.css';
import {NavLink} from 'react-router-dom';

export function AuthHint(props) {
    const {
        text = '',
        linkText = '',
        linkTo = '/',
    } = props

    return (
        <p className={style.hint}>
            { text }
            <NavLink className={style.link} to={linkTo}> { linkText }</NavLink>
        </p>
    )
}
