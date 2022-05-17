import MoviesApi from "./MoviesApi";
import MainApi from "./MainApi";

// api для получения всего списка фильмов
export const MOVIES_SERVER_URL = 'https://api.nomoreparties.co';
export const moviesApi = new MoviesApi(MOVIES_SERVER_URL + '/beatfilm-movies');

// api для работы с основным сервером (логин, регистрация, сохраненные фильмы и др)
export const MAIN_SERVER_URL = 'http://localhost:3000';
export const mainApi = new MainApi({
    url: MAIN_SERVER_URL,
    token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlM2ZlMTQwNjkwNjA4MzVhOWRjOTMiLCJpYXQiOjE2NTI0NDEwNzYsImV4cCI6MTY1MzA0NTg3Nn0.50yMHnd6JCPR5dkWiIS3StkJIod9N5QJ1rWXtiFQQn4`,
});

export function searchMovies(movies, value) {
    const filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()));
    return filteredMovies.length ? filteredMovies : null;
}

// сообщения ошибок
export const CONNECTION_ERROR = 'Во время запроса произошла ошибка. Возможно, ' +
    'проблема с соединением или сервер недоступен. Подождите немного и ' +
    'попробуйте ещё раз'
export const NAME_VALIDATION_ERROR = 'Запоните это поле (разрешаются латиница/кириллица/пробел/дефис)'

export const generateAuthError = (code = 500) => {
    let result = 'Произошла ошибка на сервере. Пожалуйста, проверьте данные и повторите попытку.'
    if (code === 409)  result = 'Аккаунт с таким e-mail уже зарегистрирован.'
    if (code === 401) result = 'Неправильные почта/пароль.'
    return result;
}

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


export const validateLink = (link) => {
    const regex = /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi;
    return regex.test(link);
}

// форматирует данные фильма для их сохранения на основном сервере
export const formValidProps = (movie) => {
    let {
        country = 'country not filled',
        director = 'director not filled',
        duration = 0,
        year = 'year not filled',
        description = 'no description',
        trailerLink = 'https://youtube.com',
        nameRU = 'no ru name',
        nameEN = 'no en name',
        id: movieId = (new Date().getTime()).toString(10),
        image: {
            url: image = '',
            formats: {
                thumbnail: {
                    url: thumbnail = '',
                }
            }
        },
    } = movie;

    country = String(country)
    director = String(director)
    duration = typeof duration === 'number' ? duration : 0
    year = String(year)
    description = String(description)
    nameRU = String(nameRU) || 'no ru name'
    nameEN = String(nameEN) || 'no en name'
    trailerLink = validateLink(trailerLink) ? trailerLink : 'https://youtube.com'
    image = typeof image === 'string' ? image : ''
    thumbnail = typeof thumbnail === 'string' ? thumbnail : ''

    return {
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN,
        movieId,
        image: MOVIES_SERVER_URL + image,
        thumbnail: MOVIES_SERVER_URL + thumbnail,
    }
}

// проверяет еслть ли фильм с таким id в списке
export const checkIdInList = (id, list) => list.some(item => item.movieId === id)


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
