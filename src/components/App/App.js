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
import {NavLink, Route, Switch, useHistory} from "react-router-dom";
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

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    return (
        <div className="app">
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/signup'>
                    <Register />
                </Route>

                <Route path='/main'>
                    <Header loggedIn={loggedIn} />
                    <Main />
                    <Footer />
                </Route>

                <Route path='/films'>
                    <Header loggedIn={loggedIn} />
                    <Movies
                        films={films}
                    />
                    <Footer />
                </Route>

                <Route path='/saved-films'>
                    <Header loggedIn={loggedIn} />
                    <SavedMovies
                        films={savedFilms}
                    />
                    <Footer />
                </Route>

                <Route path='/profile'>
                    <Header loggedIn={loggedIn} />
                    <Profile />
                </Route>
            </Switch>


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

        </div>
    );
}

export default App;
