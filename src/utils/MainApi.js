class MainApi {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

    setToken(jwt) {
        this._token = jwt;
    }

    _checkResult(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`)
    }

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResult)
    }

    saveMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
            .then(this._checkResult)
    }

    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResult)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResult)
    }
}

export default MainApi;
