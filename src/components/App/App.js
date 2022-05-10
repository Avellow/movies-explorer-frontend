import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import {useState} from "react";
import {pagesWithoutFooter, pagesWithoutHeader } from "../../utils/constants";
import { Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {films, savedFilms} from "../../utils/constants";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";

function App() {

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const history = useHistory();
    const location = useLocation();

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    function login() { // ВРЕМЕННОЕ РЕШЕНИЕ
        setLoggedIn(true);
        history.push('/movies');
    }

    function logout() { // ВРЕМЕННОЕ РЕШЕНИЕ
        setLoggedIn(false);
        history.push('/');
    }

    const shouldHeaderBeShown = () => !pagesWithoutHeader.includes(location.pathname);
    const shouldFooterBeShown = () => !pagesWithoutFooter.includes(location.pathname);

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
                    <Login
                        onLogin={login}
                    />
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

                <Route path='/profile'>
                    <Profile
                        onLogout={logout}
                    />
                </Route>

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
