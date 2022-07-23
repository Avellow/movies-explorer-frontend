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
export const addMoviesAction = (movieType, movies) => ({ type: ADD_MOVIES, payload: movies, name: movieType })
export const addMovieAction = (movieType, movie) => ({ type: ADD_MOVIE, payload: movie, name: movieType })
export const removeMovieAction = (movieType, id) => ({ type: REMOVE_MOVIE, payload: id, name: movieType })

// обертка над movies, чтобы не дублировать одинаковые редьсюеры для фильмов
export function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const { name } = action
        const isInitializationCall = state === undefined
        if (name !== reducerName && !isInitializationCall) return state

        return reducerFunction(state, action)
    }
}
