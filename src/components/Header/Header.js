import logo from '../../images/header/logo.svg';
import Navigation from "../Navigation/Navigation";
import Button from "../Button/Button";
import {authLinks, headerMenuLinks} from "../../utils/constants";
import {NavLink} from "react-router-dom";
import icon from "../../images/header/accbtn.svg";

function Header(props) {
    const {
        loggedIn,
        onBurgerClick,
    } = props;

    return (
        <header className={`header${ loggedIn ? ' header_theme_light' : '' }`}>
            <NavLink to='/main' style={{ fontSize: 0 }}>
                <img
                    className='header__logo'
                    src={ logo }
                    alt='логотип'
                />
            </NavLink>

            {!loggedIn && (
                <Navigation
                    location='header'
                    type='auth'
                >
                    <li><NavLink to='/signup' className='Navigation__link_type_signup'>
                        Регистрация
                    </NavLink></li>
                    <li><NavLink to='/signup' className='Navigation__link_type_login'>
                        Войти
                    </NavLink></li>
                </Navigation>
            )}

            {loggedIn && (
                <Navigation
                    location='header'
                    type='movies'
                >
                    <li><NavLink
                        to='/movies'
                        className='Navigation__link_type_movie'
                        activeStyle={{fontWeight: 500}}
                    >
                        Фильмы
                    </NavLink></li>
                    <li><NavLink
                        to='/savedmovies'
                        className='Navigation__link_type_movie'
                        activeStyle={{fontWeight: 500}}
                    >
                        Сохраненные фильмы
                    </NavLink></li>
                </Navigation>
            )}

            {loggedIn && (
                <NavLink to='/profile' className='Navigation__link_type_profile'>
                    Аккаунт
                    <img
                        src={icon}
                    />
                </NavLink>
            )}

            {loggedIn && <Button theme='burger' onClick={onBurgerClick} />}
        </header>
    )
}

export default Header;
