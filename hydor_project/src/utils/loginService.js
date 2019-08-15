import axios from 'axios';

export const baseUrl = "";

export function login() {

}

export function get(url, param) {
    return axios.get(url, {
        params: param,
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    })
    .then(function (response) {

    })
    .catch();
}

export function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
}


export function isLoggedIn() {
    var access_token = localStorage.getItem("access_token");
    var refresh_token = localStorage.getItem("refresh_token");
    var username = localStorage.getItem("username");

    if (access_token === null || refresh_token === null || username === null) {
        return false;
    }
    return true;

}

export function getUsername() {
    return localStorage.getItem("username");
}

export function getNickname() {
    return null;
}

export function getAccessToken() {
    return localStorage.getItem("access_token");
}

export function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

