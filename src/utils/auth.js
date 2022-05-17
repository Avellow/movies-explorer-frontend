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

export const authorize = (email, password) => {
    return fetch(`${MAIN_SERVER_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(_checkResult)
}

export const checkToken = (jwt) => {
    return fetch(`${MAIN_SERVER_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
        .then(_checkResult)
}
