export const saveMoviesToLocalStorage = (movies) => {
    try {
        localStorage.setItem('movies', JSON.stringify(movies))
    } catch (e) {
        console.log(e)
        return undefined
    }
}

export const getMoviesFromLocalStorage = () => {
    try {
        const movies = localStorage.getItem('movies')
        return movies ? JSON.parse(movies) : undefined
    } catch (e) {
        console.log(e)
        return undefined
    }
}
