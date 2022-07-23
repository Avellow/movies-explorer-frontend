const defaultState = {
    isShortFilmActive: false,
    queryString: ''
}

const CHANGE_QUERY_STRING = 'localMovies/CHANGE_QUERY_STRING'
const TOGGLE_SHORTFILM_SWITCHER = 'localMovies/TOGGLE_SHORTFILM_SWITCHER'

export const moviesFiltersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_QUERY_STRING:
            return { ...state, queryString: action.payload }
        case TOGGLE_SHORTFILM_SWITCHER:
            return { ...state, isShortFilmActive: action.payload }
        default:
            return state
    }
}

export const changeQueryStringAction = (movieType, queryString) =>
    ({ type: CHANGE_QUERY_STRING, payload: queryString, name: movieType })
export const toggleShortFilmSwitcherAction = (movieType, isActive) =>
    ({ type: TOGGLE_SHORTFILM_SWITCHER, payload: isActive, name: movieType })
