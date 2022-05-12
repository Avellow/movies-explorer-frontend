import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import { Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";
import {
    moviesApi,
    pagesWithoutFooter,
    pagesWithoutHeader, searchMovies,
} from "../../utils/constants";


function App() {

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetchErrored, setIsFetchErrored] = useState(false);



    const history = useHistory();
    const location = useLocation();



    function handleSearchSubmit(value) {
        setIsFetching(true);
        moviesApi
            .getFilms()
            .then((movies) => {
                const foundMovies = searchMovies(movies, value);
                setMovies(foundMovies);
                if (foundMovies) {
                    localStorage.setItem('lastSearchedMovies', `${value}`);
                    localStorage.setItem('movies', JSON.stringify(foundMovies));
                }
            })
            .catch((err) => {
                setIsFetchErrored(true);
                localStorage.setItem('movies', '[]')
                console.log(err)
            })
            .finally(() => setIsFetching(false))
    }

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
                    <Movies
                        movies={ movies }
                        onSearch={handleSearchSubmit}
                        isLoading={isFetching}
                        isFetchErrored={isFetchErrored}
                    />
                </Route>

                <Route path='/saved-movies'>
                    <SavedMovies films={[]} />
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
