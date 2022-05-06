import './Header.css';
import Navigation from "../Navigation/Navigation";
import Button from "../Button/Button";
import {NavLink} from "react-router-dom";
import icon from "../../images/header/accbtn.svg";
import Logo from "../Logo/Logo";

function Header(props) {
    const {
        loggedIn,
        onBurgerClick,
    } = props;

    return (
        <header className={`header${ loggedIn ? ' header_theme_light' : '' }`}>
            <Logo />

            {!loggedIn && (
                <Navigation
                    location='header'
                    type='auth'
                >
                    <li><NavLink to='/signup' className='navigation__link navigation__link_type_signup'>
                        Регистрация
                    </NavLink></li>
                    <li><NavLink to='/signin' className='navigation__link navigation__link_type_login'>
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
                        className='navigation__link navigation__link_type_movie'
                        activeStyle={{fontWeight: 500}}
                    >
                        Фильмы
                    </NavLink></li>
                    <li><NavLink
                        to='/saved-movies'
                        className='navigation__link navigation__link_type_movie'
                        activeStyle={{fontWeight: 500}}
                    >
                        Сохраненные фильмы
                    </NavLink></li>
                </Navigation>
            )}

            {loggedIn && (
                <NavLink to='/profile' className='navigation__link navigation__link_type_profile'>
                    Аккаунт
                    <img
                        src={icon}
                        alt='иконка'
                    />
                </NavLink>
            )}

            {loggedIn && <Button theme='burger' onClick={onBurgerClick} />}
        </header>
    )
}

export default Header;
