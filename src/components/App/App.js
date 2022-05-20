import './App.css';
import Header from '../Header/Header';
import Main from '../landing/Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import {useCallback, useEffect, useState} from "react";
import { Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";
import * as auth from '../../utils/auth';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
    formValidProps, generateError,
    mainApi,
    moviesApi,
    pagesWithoutFooter,
    pagesWithoutHeader,
    searchMovies,
} from "../../utils/constants";
import Popup from "../Popup/Popup";
import PopupWithError from "../PopupWithError/PopupWithError";

function App() {

    const [ loggedIn, setLoggedIn ] = useState(Boolean(sessionStorage.getItem('loggedIn')) || false);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
    const [savedMovies, setSavedMovies] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetchErrored, setIsFetchErrored] = useState(false);

    const [isFetchingMainServer, setIsFetchingMainServer] = useState(false);
    const [isFetchMainServerErrored, setIsFetchMainServerErrored] = useState(false);

    const [authStatus, setAuthStatus] = useState({success: true, err: null}) //мб оптимизировать - просто err

    const [currentUser, setCurrentUser] = useState({})

    const [isUserUpdateSucceed, setIsUserUpdateSucceed] = useState(null);

    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(true);
    const [errorText, setErrorText] = useState(null);

    const [
        isShortFilmToggleChecked,
        setIsShortFilmToggleChecked
    ] = useState(JSON.parse(localStorage.getItem('isShortFilmToggleChecked')));

    const history = useHistory();
    const location = useLocation();

    const handleTokenCheck = useCallback(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            setIsFetchingMainServer(true);
            auth
                .checkToken(jwt)
                .then((user) => {
                    setCurrentUser(prevUserInfo => ({...prevUserInfo, ...user}));
                    setLoggedIn(true);
                    sessionStorage.setItem('loggedIn', 'true');
                })
                .catch((err) => {
                    showError(err, 's');
                    onSignOut();
                })
                .finally(() => setIsFetchingMainServer(false));
        } else {
            onSignOut();
        }
    }, [history]);

    useEffect(() => {
        setIsFetchingMainServer(true)
        handleTokenCheck();
        if (loggedIn) {
            Promise
                .all([mainApi.getMovies(), mainApi.getUserInfo()])
                .then(([movies, user]) => {
                    setSavedMovies(movies);
                    setCurrentUser(user);
                })
                .catch((err) => {
                    showError(err, 'Не удалось получить информацию.');
                    setIsFetchMainServerErrored(true);
                })
                .finally(() => setIsFetchingMainServer(false))
        } else {
            setIsFetchingMainServer(false);
        }
    }, [loggedIn, handleTokenCheck])

    function handleMovieSave(movie) {
        const formedMovie = formValidProps(movie);
        mainApi
            .saveMovie(formedMovie)
            .then((savedMovie) => {
                setSavedMovies(prevState => [...prevState, savedMovie])
            })
            .catch(err => showError(err, 'Не удалось сохранить фильм.'))
    }

    function handleMovieDelete(id) {
        const movieToDelete = savedMovies.find(movie => movie.movieId === id)

        mainApi
            .deleteMovie(movieToDelete._id)
            .then(({data: movie}) => {
                setSavedMovies(prevState => prevState.filter(m => m.movieId !== movie.movieId))
            })
            .catch(err => showError(err, 'Не удалось удалить фильм.'))
    }

    function handleSearchSubmit(value) {
        setIsFetching(true);
        moviesApi
            .getFilms()
            .then((movies) => {
                const foundMovies = searchMovies(movies, value)
                setMovies(foundMovies);
                localStorage.setItem('lastSearchedMovies', `${value}`);
                localStorage.setItem('movies', JSON.stringify(foundMovies));
            })
            .catch((err) => {
                setIsFetchErrored(true);
                localStorage.setItem('movies', null)
                console.log(err)
            })
            .finally(() => setIsFetching(false))
    }

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
        setIsErrorPopupOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    function onRegister(name, email, password) {
        setIsFetching(true)
        auth
            .register(name, email, password)
            .then(() => {
                setAuthStatus(prevState => ({...prevState, success: true, err: null}))
                onLogin(email, password)
            })
            .catch(err => {
                console.log(err);
                setAuthStatus(prevState => ({...prevState, success: false, err}))
            })
            .finally(() => setIsFetching(false))
    }

    function onLogin(email, password) {
        setIsFetching(true)
        auth
            .authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    mainApi.setToken(`Bearer ${data.token}`);
                    setAuthStatus(prevState => ({...prevState, success: true, err: null}))
                    setLoggedIn(true);
                    history.push('/movies');
                }
            })
            .catch(err => {
                console.log(err);
                setAuthStatus(prevState => ({...prevState, success: false, err}))
            })
            .finally(() => setIsFetching(false))
    }

    function onUserInfoUpdate(name, email) {
        mainApi
            .updateUserInfo(name, email)
            .then(({name, email}) => {
                    setCurrentUser(prevState => ({...prevState, name, email}));
                    setIsUserUpdateSucceed(true);
                }
            )
            .catch((err) => {
                console.log(err);
                setIsUserUpdateSucceed(false);
            })
            .finally(() => setTimeout(() => {setIsUserUpdateSucceed(null)}, 10000))
    }

    function onSignOut() {
        setLoggedIn(false);
        setMovies([]);
        setSavedMovies([]);
        localStorage.clear();
        sessionStorage.removeItem('loggedIn');
        history.push('/');
    }

    function onToggleCheck() {
        setIsShortFilmToggleChecked(!isShortFilmToggleChecked);
        localStorage.setItem('isShortFilmToggleChecked', `${!isShortFilmToggleChecked}`)
    }

    function showError(err, text = '') {
        setIsErrorPopupOpened(true);
        setErrorText(generateError(err, text))
    }

    function onMainPageReturn() {
        setErrorText(null)
        closeAllPopups();
    }

    const shouldHeaderBeShown = () => !pagesWithoutHeader.includes(location.pathname);
    const shouldFooterBeShown = () => !pagesWithoutFooter.includes(location.pathname);

    return (
        <div className="app">
            <CurrentUserContext.Provider value={currentUser}>
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
                        {
                            loggedIn
                                ? (<Redirect to='/'/>)
                                : (
                                    <Login
                                        onLogin={onLogin}
                                        isFetching={isFetching}
                                        loginStatus={authStatus}
                                    />
                                )
                        }
                    </Route>

                    <Route path='/signup'>
                        {
                            loggedIn
                                ? (<Redirect to='/'/>)
                                : (
                                    <Register
                                        onRegister={onRegister}
                                        isFetching={isFetching}
                                        registrationStatus={authStatus}
                                    />
                                )
                        }
                    </Route>

                    <ProtectedRoute
                        component={Movies}
                        loggedIn={loggedIn}
                        movies={movies}
                        exact path='/movies'
                        savedMovies={ savedMovies }
                        onSearch={handleSearchSubmit}
                        isLoading={isFetching}
                        isFetchErrored={isFetchErrored}
                        onMovieSave={handleMovieSave}
                        onMovieDelete={handleMovieDelete}
                        onToggleCheck={onToggleCheck}
                        isToggleChecked={isShortFilmToggleChecked}
                    />

                    <ProtectedRoute
                        exact path='/saved-movies'
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        movies={savedMovies}
                        onMovieDelete={handleMovieDelete}
                        isLoading={isFetchingMainServer}
                        isFetchErrored={isFetchMainServerErrored}
                        onToggleCheck={onToggleCheck}
                        isToggleChecked={isShortFilmToggleChecked}
                    />

                    <ProtectedRoute
                        exact path='/profile'
                        component={Profile}
                        loggedIn={loggedIn}
                        onUpdate={onUserInfoUpdate}
                        onLogout={onSignOut}
                        isUpdateSucceed={isUserUpdateSucceed}
                    />

                    <Route path='/404' component={NotFound} />
                    <Route path="*"><Redirect to='/404'/></Route>
                </Switch>

                <SideMenu
                    isOpened={isPopupMenuOpened}
                    onClose={closeAllPopups}
                />

                {shouldFooterBeShown() && <Footer/>}
            </CurrentUserContext.Provider>

            {errorText && (
                <PopupWithError
                    onClose={closeAllPopups}
                    isOpened={isErrorPopupOpened}
                    errorText={errorText}
                    onReturn={onMainPageReturn}
                />)
            }
        </div>
    );
}

export default App;
