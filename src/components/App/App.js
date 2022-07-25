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
    delay,
    formValidProps, generateError,
    mainApi,
    moviesApi,
    pagesWithoutFooter,
    pagesWithoutHeader,
} from "../../utils/constants";
import PopupWithError from "../PopupWithError/PopupWithError";
import {useDispatch, useSelector} from 'react-redux';
import {addMoviesAction} from '../../store/reducers/movies/data/movies-data-reducer';
import {userLogoutAction} from '../../store';
import {getUserDetails} from '../../store/reducers/auth/user/userAction';

function App() {
    console.log('app render')
    // redux
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => !!state.user.isAuth)
    const setLoggedIn = () => {}

    const { userToken } = useSelector(state => state.user)


    // end redux
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const [savedMovies, setSavedMovies] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetchErrored, setIsFetchErrored] = useState(false);

    const [isFetchingMainServer, setIsFetchingMainServer] = useState(false);
    const [isFetchMainServerErrored, setIsFetchMainServerErrored] = useState(false);

    const [authStatus, setAuthStatus] = useState({success: true, err: null}) //мб оптимизировать - просто err

    const [currentUser, setCurrentUser] = useState({})

    const [isUserUpdateSucceed, setIsUserUpdateSucceed] = useState(null);

    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);
    const [errorText, setErrorText] = useState(null);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (loggedIn) {
            dispatch(getUserDetails())
        }
    }, [loggedIn, dispatch])


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

    function loadMovies() {
        setIsFetching(true);

        return moviesApi
            .getFilms()
            .then((loadedMovies) => {
                dispatch(addMoviesAction('apiMovies', loadedMovies))
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

    const cleanErrorMessage = useCallback(() => {
        setAuthStatus(prevState => ({...prevState, success: true, err: null}))
    }, [setAuthStatus])

    function onUserInfoUpdate(name, email) {
        setIsFetching(true)
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
            .finally(() => {
                setIsFetching(false);
                setTimeout(() => {
                    setIsUserUpdateSucceed(null)
                }, 10000)
            })
    }

    function onSignOut() {
        setLoggedIn(false);
        dispatch(userLogoutAction())
        setSavedMovies(null);
        setCurrentUser(null);
        localStorage.clear();
        sessionStorage.removeItem('loggedIn');
        history.push('/');
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
                                        isFetching={isFetching}
                                        loginStatus={authStatus}
                                        cleanError={cleanErrorMessage}
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
                                        isFetching={isFetching}
                                        registrationStatus={authStatus}
                                        cleanError={cleanErrorMessage}
                                    />
                                )
                        }
                    </Route>

                    <ProtectedRoute
                        component={Movies}
                        loggedIn={loggedIn}
                        exact path='/movies'
                        savedMovies={ savedMovies }
                        loadMovies={loadMovies}
                        isLoading={isFetching}
                        isFetchErrored={isFetchErrored}
                        onMovieSave={handleMovieSave}
                        onMovieDelete={handleMovieDelete}
                    />

                    <ProtectedRoute
                        exact path='/saved-movies'
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        onMovieDelete={handleMovieDelete}
                        isLoading={isFetchingMainServer}
                        isFetchErrored={isFetchMainServerErrored}
                    />

                    <ProtectedRoute
                        exact path='/profile'
                        component={Profile}
                        loggedIn={loggedIn}
                        onUpdate={onUserInfoUpdate}
                        onLogout={onSignOut}
                        isUpdateSucceed={isUserUpdateSucceed}
                        isFetching={isFetching}
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
