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
import {NavLink, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Button from "../Button/Button";
import icon from "../../images/header/accbtn.svg";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {films, savedFilms} from "../../utils/constants";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";

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

    const shouldHeaderBeShown = () => (
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/404'
    );
    const shouldFooterBeShown = () => (
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/profile' &&
        location.pathname !== '/404'
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
                <Route exact path='/'>
                    <Main />
                </Route>

                <Route path='/signin'>
                    <Login />
                </Route>

                <Route path='/signup'>
                    <Register />
                </Route>

                <Route path='/movies'>
                    <Movies films={films} />
                </Route>

                <Route path='/saved-movies'>
                    <SavedMovies films={savedFilms} />
                </Route>

                <Route path='/profile' component={Profile} />

                <Route path='/404' component={NotFound} />
                <Route path="*"><Redirect to='/404'/></Route>
            </Switch>

            <SideMenu
                isOpened={isPopupMenuOpened}
                onClose={closeAllPopups}
            />

            {shouldFooterBeShown() && <Footer/>}

        </div>
    );
}

export default App;
