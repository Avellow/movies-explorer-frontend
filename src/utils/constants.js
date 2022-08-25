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
    'проблема с соединением или сервер недоступен.'
export const NAME_VALIDATION_ERROR = 'Заполните это поле (разрешаются латиница/кириллица/пробел/дефис)'
export const EMAIL_VALIDATION_ERROR = 'Неправильный формат почты'

export const generateAuthError = (code) => {
    switch (code) {
        case 409:
            return 'Аккаунт с таким e-mail уже зарегистрирован.'
        case 401:
            return 'Неправильные почта/пароль.'
        default:
            return 'Соединение с сервером потеряно.'
    }
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

/* Генерирует количество карточек для отрисовки в зависимости от ширины экрана;
* count - количество отрисованных карточек в данный момент
* cardIncrement - количество карточек которое будет дополнительно загружено при клике на кнопку 'Ещё';
* inListCount - генерирует новое количество отрисованных карточек в зависимости от текущего count (см. выше);
    (count - count % 2) - формирует равномерное количество карточек в ряду, если они не последние в списке,
    при изменении ширины экрана количество карточек не будет сбрасываться до стандартного
*/
export function generateCardsCount(width, count) {
    if (width < 1236 && width > 673) {
        return {
            cardIncrement: 2,
            inListCount: count < 8 ? 8 : (count - count % 2)
        }
    } else if (width <= 673) {
        return {
            cardIncrement: 2,
            inListCount: count < 5 ? 5 : (count - count % 2)
        }
    } else {
        return {
            cardIncrement: 3,
            inListCount: count < 12 ? 12 : (count - count % 3)
        }
    }
}

// генерирует размер чанка с фильмами при первой отрисовки списка
export const getInitialChunkSize = (width) => {
    if (width < 1236 && width > 673) {
        return 8
    } else if (width <= 673) {
        return 5
    } else {
        return 12
    }
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

// отложенные функции обработчики состояний запросов на api

export const beginLoading = (state) => {
    state.loading = true
    state.error = null
}

export const setMoviesData = (state, { payload }) => {
    state.loading = false
    state.data = payload
}

export const pushMovieData = (state, { payload }) => {
    state.loading = false
    state.data.push(payload)
}

export const removeMovieFromStore = (state, { payload }) => {
    state.loading = false
    state.data = state.data.filter(movie =>
        movie.movieId !== payload.movieId)
}

export const onAuthSuccess = (state, { payload }) => {
    state.loading = false
    state.userToken = payload.token
    state.isAuth = true
}

export const onRegisterSuccess = (state, { payload }) => {
    state.loading = false
    state.success = true // registration successful
}

export const setUserInfo = (state, { payload }) => {
    state.loading = false
    state.userInfo = payload
}

export const updateUserInfo = (state, { payload }) => {
    state.loading = false
    state.userInfo.name = payload.name
    state.userInfo.email = payload.email
}

export const setRequestError = (state, { payload }) => {
    state.loading = false
    state.error = payload
}

export const errorHandlerOnAsyncThunk = (error, handler) => {
    if (error.message) return handler(error.message)

    return handler(error)
}
