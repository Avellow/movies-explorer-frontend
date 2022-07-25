const defaultState = []

const ADD_MOVIES = 'ADD_MOVIES'
const ADD_MOVIE = 'ADD_MOVIE'
const REMOVE_MOVIE = 'REMOVE_MOVIE'

export const moviesDataReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_MOVIES:
            return [ ...action.payload ]
        case ADD_MOVIE:
            return [ ...state.movies, action.payload ]
        case REMOVE_MOVIE:
            return state.movies.filter(movie => movie.id !== action.payload)
        default:
            return state;
    }
}
// универсальные экшены для разных групп фильмов
// TODO: переделать payload на объекты типа payload.movies (хорошая практика)
export const addMoviesAction = (movieType, movies) => ({ type: ADD_MOVIES, payload: movies, name: movieType })
export const addMovieAction = (movieType, movie) => ({ type: ADD_MOVIE, payload: movie, name: movieType })
export const removeMovieAction = (movieType, id) => ({ type: REMOVE_MOVIE, payload: id, name: movieType })
