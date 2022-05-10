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

}

export default MainApi;
