import MoviesApi from "./MoviesApi";
import MainApi from "./MainApi";

// api для получения всего списка фильмов
export const MOVIES_SERVER_URL = 'https://api.nomoreparties.co';
export const moviesApi = new MoviesApi(MOVIES_SERVER_URL + '/beatfilm-movies');

// api для работы с основным сервером (логин, регистрация, сохраненные фильмы и др)
export const MAIN_SERVER_URL = 'http://127.0.0.1:3000';
export const mainApi = new MainApi({
    url: MAIN_SERVER_URL,
    token: localStorage.getItem('userToken')
});

// сообщения ошибок и результатов операций
export const CONNECTION_ERROR = 'Во время запроса произошла ошибка. Возможно, ' +
    'проблема с соединением или сервер недоступен. Подождите немного и ' +
    'попробуйте ещё раз'
export const NAME_VALIDATION_ERROR = 'Запоните это поле (разрешаются латиница/кириллица/пробел/дефис)'
export const EMAIL_VALIDATION_ERROR = 'Неправильный формат почты'

export const generateAuthError = (code = 500) => {
    let result = 'Произошла ошибка на сервере. Пожалуйста, проверьте данные и повторите попытку.'
    if (code === 409)  result = 'Аккаунт с таким e-mail уже зарегистрирован.'
    if (code === 401) result = 'Неправильные почта/пароль.'
    return result;
}

export const generateError = (err, defaultText = '') => {
    console.log(err);
    if (defaultText) return `${defaultText} (${err})`;

    let result;
    switch(err) {
        case 401: result = 'Некорректный токен'; break;
        case 404: result = 'Запрос по несуществующему пути'; break;
        default: result = `Произошла неизвестная ошибка ${err}`
    }

    return result;
}

export const userInfoUpdateSuccess = 'Данные профиля успешно обновлены'

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

export const shortDuration = 40;

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

// задержка для промисов
export function delay(ms, passValue = null) {
    return new Promise((resolve) =>
        setTimeout(() => resolve(passValue), ms))
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
        id: 1,
        to: '/',
        text: 'Главная'
    },
    {
        id: 2,
        to: '/movies',
        text: 'Фильмы',
    },
    {
        id: 3,
        to: '/saved-movies',
        text: 'Сохранённые фильмы',
    }
];

export const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
