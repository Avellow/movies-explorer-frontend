import MoviesApi from "./MoviesApi";
import MainApi from "./MainApi";

// api для получения всего списка фильмов
export const MOVIES_SERVER_URL = 'https://api.nomoreparties.co';
export const moviesApi = new MoviesApi(MOVIES_SERVER_URL + '/beatfilm-movies');

// api для работы с основным сервером (логин, регистрация, сохраненные фильмы и др)
export const MAIN_SERVER_URL = 'https://api.movies-expl.nomoredomains.work';
export const mainApi = new MainApi({
    url: MAIN_SERVER_URL,
    token: `Bearer ${localStorage.getItem('jwt')}`,
});




export const pagesWithoutHeader = [
    '/signin',
    '/signup',
    '/404',
];

export const pagesWithoutFooter = [
    '/signin',
    '/signup',
    '/404',
    '/profile',
];

export const popupMenuLinks = [
    {
        to: '/',
        text: 'Главная'
    },
    {
        to: '/movies',
        text: 'Фильмы',
    },
    {
        to: '/saved-movies',
        text: 'Сохранённые фильмы',
    }
];

export const customfilms = [
    {
        title: 'dsadsa',
        duration: 27,
        posterLink: 'https://images.unsplash.com/photo-1574273509043-f94f45e5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
    },
];

export const savedFilms = [
    {
        title: 'СОХРАЕННЫЙ ФИЛЬМ',
        duration: 27,
        posterLink: 'https://images.unsplash.com/photo-1574273509043-f94f45e5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
    },
    {
        title: 'СОХРАЕННЫЙ ФИЛЬМ',
        duration: 27,
        posterLink: 'https://images.unsplash.com/photo-1574273509043-f94f45e5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
    },
    {
        title: 'СОХРАНЕННЫЙ ФИЛЬМ',
        duration: 27,
        posterLink: 'https://images.unsplash.com/photo-1574273509043-f94f45e5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
    },
]
