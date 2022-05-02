import logo from '../../images/header/logo.svg';
import Navigation from "../Navigation/Navigation";
import Button from "../Button/Button";
import {headerMenuLinks} from "../../utils/constants";
import {NavLink} from "react-router-dom";
import icon from "../../images/header/accbtn.svg";

function Header(props) {
    const {
        loggedIn,
        onBurgerClick,
    } = props;

    function foo() {
        console.log(onBurgerClick)
    }

    return (
        <header className={`header${ loggedIn ? ' header_theme_light' : '' }`}>
            <img
                className='header__logo'
                src={ logo }
                alt='логотип'
            />
            <Navigation
                loggedIn={true}
                location='header'
            >
                {headerMenuLinks.map(({to, text}, i) => (
                    <li key={i}>
                        <NavLink
                            to={to}
                            className='Navigation__link'
                            activeStyle={{ fontWeight: 500 }}
                        >
                            { text }
                        </NavLink>
                    </li>
                ))}
            </Navigation>
            <Navigation
                loggedIn={true}
                location='header'
            >
                <li><Button text={`Аккаунт`} icon={icon} theme='acc' /></li>
            </Navigation>

            {loggedIn && <Button theme='burger' onClick={onBurgerClick} />}
        </header>
    )
}

export default Header;
