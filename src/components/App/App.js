import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Form from "../Form/Form";
import Auth from "../Auth/Auth";
import Input from "../Input/Input";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import Popup from "../Popup/Popup";
import Navigation from "../Navigation/Navigation";
import { popupMenuLinks } from "../../utils/constants";
import {NavLink} from "react-router-dom";
import Button from "../Button/Button";
import icon from "../../images/header/accbtn.svg";
import Profile from "../Profile/Profile";

function App() {

    const [ loggedIn, setLoggedIn ] = useState(true);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    return (
        <div className="app">
            <Header
                loggedIn={loggedIn}
                onBurgerClick={openMenuPopup}
            />

            <Profile />

            <Footer />

            <Popup
                isOpened={isPopupMenuOpened}
                name='menu'
                onClose={closeAllPopups}
            >
                <Navigation
                    loggedIn={true}
                    location='popup'
                >
                    {popupMenuLinks.map(({to, text}, i) => (
                        <li key={i}>
                            <NavLink
                                to={to}
                                className='Navigation__link'
                                activeStyle={{ textDecoration: "underline" }}
                            >
                                { text }
                            </NavLink>
                        </li>
                    ))}
                    <li style={{ margin: 'auto 0 0' }}><Button text={`Аккаунт`} icon={icon} theme='acc' /></li>
                </Navigation>
            </Popup>


            {/*<Auth>
                <Form
                    title='Добро пожаловать!'
                    buttonText='Зарегистрироваться'
                    hintText='Уже зарегистрированы?'
                    hintLinkText='Войти'
                >
                    <Input name='Имя'/>
                    <Input name='E-mail' type='email'/>
                    <Input name='Пароль' type='password'/>
                    <Button
                        theme='auth'
                        text='Зарегистрироваться'
                    />
                    <p className='Form__hint'>
                        Уже зарегистрированы?
                        <a className='Form__hint-link' href='/'> Войти</a>
                    </p>
                </Form>
            </Auth>
                <Auth>
                <Form
                title='Рады видеть!'
                >
                <Input name='E-mail' type='email' />
                <Input name='Пароль' type='password' />
                <Button
                theme='auth'
                text='Войти'
                />
                <p className='Form__hint'>
                Ещё не зарегистрированы?
                <a className='Form__hint-link' href='/'> Регистрация</a>
                </p>
                </Form>
                </Auth>*/}
        </div>
    );
}

export default App;
