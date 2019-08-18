import axios from 'axios';

export const apiurl = "https://hyodor.azurewebsites.net/api/v1/";

export function login(username, password) {
    return axios.post(apiurl + "login", {
        username: username,
        password: password
    })
    .then(function (response) {
        setUsername(response.data['username']);
        setNickname(response.data['nickname']);
        setAccessToken(response.data['access_token']);
        setRefreshToken(response.data['refresh_token']);
    })
    .catch(function (error) {
        throw new Error(error.response.data['msg']);
    })
}

export function loginRefresh() {
    var refresh = getRefreshToken();

    return axios.get(apiurl + "login-refresh", {
        headers: {
            'Authorization': 'Bearer ' + refresh
        }
    })
    .then(function (response) {
        var token = response.data["access_token"];
        if (token == undefined) {
            throw new Error("login refresh failed");
        }
        setAccessToken(token);
    })
    .catch(function (error) {
        throw new Error("login refresh failed");
    })
    
}

export function get(url, param) {
    return axios.get(url, {
        params: param,
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        if (error.response) {
            if (error.response.status == 401) {

                return loginRefresh()
                .then(function () {
                    return axios.get(url, {
                        params: param,
                        headers: {
                            'Authorization': 'Bearer ' + getAccessToken()
                        }
                    });
                })
                .catch(function () {
                    throw error
                })

            }
        }
        throw error;
    })
}


export function post(url, data) {
    return axios.post(url, data, {
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        if (error.response) {
            if (error.response.status == 401) {

                return loginRefresh()
                .then(function () {
                    return axios.post(url, data, {
                        headers: {
                            'Authorization': 'Bearer ' + getAccessToken()
                        }
                    });
                })
                .catch(function () {
                    throw error
                })

            }
        }
        throw error;
    })
}


export function put(url, data) {
    return axios.put(url, data, {
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        if (error.response) {
            if (error.response.status == 401) {

                return loginRefresh()
                .then(function () {
                    return axios.put(url, data, {
                        headers: {
                            'Authorization': 'Bearer ' + getAccessToken()
                        }
                    });
                })
                .catch(function () {
                    throw error
                })

            }
        }
        throw error;
    })
}


export function del(url, param) {
    return axios.delete(url, {
        params: param,
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        if (error.response) {
            if (error.response.status == 401) {

                return loginRefresh()
                .then(function () {
                    return axios.delete(url, {
                        params: param,
                        headers: {
                            'Authorization': 'Bearer ' + getAccessToken()
                        }
                    });
                })
                .catch(function () {
                    throw error
                })

            }
        }
        throw error;
    })
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

export function setUsername(username) {
    return localStorage.setItem("username", username);
}

export function getNickname() {
    return localStorage.getItem("nickname");
}

export function setNickname(nickname) {
    return localStorage.setItem("nickname", nickname);
}

export function getAccessToken() {
    return localStorage.getItem("access_token");
}

export function setAccessToken(token) {
    localStorage.setItem("access_token", token);
}

export function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

export function setRefreshToken(token) {
    localStorage.setItem("refresh_token", token);
}
