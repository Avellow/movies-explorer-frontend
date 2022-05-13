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

export function searchMovies(movies, value) {
    const filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()));
    return filteredMovies.length ? filteredMovies : null;
}

// сообщения ошибок
export const CONNECTION_ERROR = 'Во время запроса произошла ошибка. Возможно, ' +
    'проблема с соединением или сервер недоступен. Подождите немного и ' +
    'попробуйте ещё раз'

// зависимость отрисованных карточек от ширины экрана
// функционал РАБОТАЕТ но гляну потом свежим взглядом на это безобразие :)
export function generateCardsCount(width, count) {

    const result = {
        cardIncrement: 3,
        inListCount: count < 12 ? 12 : count - count % 3
    }

    if (width < 1236 && width > 673) {
        result.cardIncrement = 2
        result.inListCount = count < 8 ? 8 : count - count % 2
    } else if (width <= 673) {
        result.cardIncrement = 2
        result.inListCount = count < 5 ? 5 : count - count % 2
    }
    return result;
}

export const initialCardsCount = (width) => {
    let result = 12;

    if (width < 1236 && width > 673) {
        result = 8
    } else if (width <= 673) {
        result = 5
    }
    return result;
};

// отображаемая длительность фильма

export const formDuration = (duration) => {
    let declension = ' минут';

    const dozen = Number(('' + duration).slice(-2));

    if (dozen > 9 && dozen < 21) declension = ' минут';
    else if (dozen % 10 === 1) declension = ' минута';
    else if (dozen % 10 < 5 && dozen % 10 > 0) declension = ' минуты';

    return duration + declension;
}

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
