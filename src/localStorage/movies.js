export const saveMoviesToLocalStorage = (movies) => {
    try {
        localStorage.setItem('new-movies', JSON.stringify(movies))
    } catch (e) {
        console.log(e)
        return undefined
    }
}

export const getMoviesFromLocalStorage = () => {
    try {
        const movies = localStorage.getItem('new-movies')
        return movies ? JSON.parse(movies) : undefined
    } catch (e) {
        console.log(e)
        return undefined
    }
}
