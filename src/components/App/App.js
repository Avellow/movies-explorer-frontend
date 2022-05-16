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
import * as auth from '../../utils/auth';
import {
    checkIdInList,
    formValidProps,
    mainApi,
    MOVIES_SERVER_URL,
    moviesApi,
    pagesWithoutFooter,
    pagesWithoutHeader, searchMovies,
} from "../../utils/constants";


function App() {

    const [ loggedIn, setLoggedIn ] = useState(true);
    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
    const [savedMovies, setSavedMovies] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetchErrored, setIsFetchErrored] = useState(false);

    const [isFetchingMainServer, setIsFetchingMainServer] = useState(false);
    const [isFetchMainServerErrored, setIsFetchMainServerErrored] = useState(false);

    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // сюда проверка токена
        setIsFetchingMainServer(true)
        if (loggedIn) {
            Promise
                .all([mainApi.getMovies()])
                .then(([movies]) => {
                    setSavedMovies(movies);
                })
                .catch((err) => {
                    console.log(err);
                    setIsFetchMainServerErrored(true);
                })
                .finally(() => setIsFetchingMainServer(false))
        }
    }, [loggedIn])

    function handleMovieSave(movie) {
        const formedMovie = formValidProps(movie);
        mainApi
            .saveMovie(formedMovie)
            .then((savedMovie) => {
                setSavedMovies(prevState => [...prevState, savedMovie])
            })
            .catch(console.log)
    }

    function handleMovieDelete(id) {
        const movieToDelete = savedMovies.find(movie => movie.movieId === id)

        mainApi
            .deleteMovie(movieToDelete._id)
            .then(({data: movie}) => {
                setSavedMovies(prevState => prevState.filter(m => m.movieId !== movie.movieId))
            })
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
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
    }

    function onRegister(name, email, password) {
        setIsFetching(true)
        auth
            .register(name, email, password)
            .then((user) => {
                console.log(user);
                setRegistrationSuccess(true)
                history.push('/') // заменю попапом с результатом и таймером на перенаправление
            })
            .catch(console.log)
            .finally(() => setIsFetching(false))
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
                    <Register
                        onRegister={onRegister}
                        isFetching={isFetching}
                    />
                </Route>

                <Route path='/movies'>
                    <Movies
                        movies={ movies }
                        savedMovies={ savedMovies }
                        onSearch={handleSearchSubmit}
                        isLoading={isFetching}
                        isFetchErrored={isFetchErrored}
                        onMovieSave={handleMovieSave}
                        onMovieDelete={handleMovieDelete}
                    />
                </Route>

                <Route path='/saved-movies'>
                    <SavedMovies
                        movies={savedMovies}
                        onMovieDelete={handleMovieDelete}
                        isLoading={isFetchingMainServer}
                        isFetchErrored={isFetchMainServerErrored}
                        onSearch=''
                    />
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
