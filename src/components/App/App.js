import './App.css';
import Header from '../Header/Header';
import Main from '../landing/Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import { Redirect, Route, Switch, useLocation} from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
    delay,
    formValidProps,
    pagesWithoutFooter,
    pagesWithoutHeader,
} from "../../utils/constants";
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../../store/slices/user/userAction';
import {
    getUserMovies,
    removeUserMovie,
    saveUserMovie
} from '../../store/slices/movies/userMovies/userMoviesAction';


function App() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => !!state.user.isAuth)
    const newSavedMovies = useSelector(state => state.movies.userMovies.data)

    const [ isPopupMenuOpened, setIsPopupMenuOpened] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (loggedIn) {
            dispatch(getUserDetails())
            dispatch(getUserMovies())
        }
    }, [loggedIn, dispatch])

    function handleMovieSave(movie) {
        return () => {
            const formedMovie = formValidProps(movie);
            dispatch(saveUserMovie(formedMovie))
        }
    }

    function handleMovieDelete(movie) {
        const id = movie.id || movie.movieId;
        return () => {
            const movieToDelete = newSavedMovies.find(movie => movie.movieId === id)
            dispatch(removeUserMovie(movieToDelete._id))
        }
    }

    function closeAllPopups() {
        setIsPopupMenuOpened(false);
    }

    function openMenuPopup() {
        setIsPopupMenuOpened(true);
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
                <Route exact path="/">
                    <Main/>
                </Route>

                <Route path="/signin">
                    {
                        loggedIn
                            ? (<Redirect to="/"/>)
                            : (<Login />)
                    }
                </Route>

                <Route path="/signup">
                    {
                        loggedIn
                            ? (<Redirect to="/"/>)
                            : (<Register />)
                    }
                </Route>

                <ProtectedRoute
                    component={Movies}
                    loggedIn={loggedIn}
                    exact path="/movies"
                    onMovieSave={handleMovieSave}
                    onMovieDelete={handleMovieDelete}
                />

                <ProtectedRoute
                    exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    onMovieDelete={handleMovieDelete}
                />

                <ProtectedRoute
                    exact path="/profile"
                    component={Profile}
                    loggedIn={loggedIn}
                />

                <Route path="/404" component={NotFound}/>
                <Route path="*"><Redirect to="/404"/></Route>
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
