import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Form from "../Form/Form";
import Input from "../Input/Input";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import Popup from "../Popup/Popup";
import Navigation from "../Navigation/Navigation";
import { popupMenuLinks } from "../../utils/constants";
import {NavLink, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Button from "../Button/Button";
import icon from "../../images/header/accbtn.svg";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {films, savedFilms} from "../../utils/constants";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {

    const [ loggedIn, setLoggedIn ] = useState(true);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const history = useHistory();
    const location = useLocation();

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    const shouldHeaderBeShown = () => location.pathname !== '/login' && location.pathname !== '/signup';
    const shouldFooterBeShown = () => (
        location.pathname !== '/login' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/profile'
    );


    return (
        <div className="app">
            {shouldHeaderBeShown() && (
                <Header
                    loggedIn={loggedIn}
                    onBurgerClick={openMenuPopup}
                />
            )}
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/signup'>
                    <Register />
                </Route>

                <Route path='/main'>
                    <Main />
                </Route>

                <Route path='/movies'>
                    <Movies films={films} />
                </Route>

                <Route path='/savedmovies'>
                    <SavedMovies films={savedFilms} />
                </Route>

                <Route path='/profile' component={Profile} />
            </Switch>
            {shouldFooterBeShown() && <Footer/>}

            <Popup
                isOpened={isPopupMenuOpened}
                name='menu'
                onClose={closeAllPopups}
            >
                <Navigation
                    loggedIn={true}
                    location='popup'
                    type='side'
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
                    <li style={{ margin: 'auto 0 0' }}>
                        <NavLink
                            to='/profile'
                            className='Navigation__link_type_profile'
                            style={{ display: 'flex' }}
                        >
                            Аккаунт
                            <img
                                src={icon}
                                alt='профиль'
                            />
                        </NavLink>
                    </li>
                </Navigation>
            </Popup>

        </div>
    );
}

export default App;
