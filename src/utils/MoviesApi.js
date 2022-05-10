class MoviesApi {
    constructor(url) {
        this._url = url;
    }

    _checkResult(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`)
    }

    getFilms() {
        return fetch(`${this._url}`)
            .then(this._checkResult)
    }
}

export default MoviesApi;
