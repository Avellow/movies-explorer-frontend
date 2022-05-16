import {MAIN_SERVER_URL} from "./constants";

function _checkResult(res) {
    return res.ok
        ? res.json()
        : Promise.reject(res.status)
}

export const register = (name, email, password) => {
    return fetch(`${MAIN_SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(_checkResult)
}
