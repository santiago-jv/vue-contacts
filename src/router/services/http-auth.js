import http from "./http-commons";

const register = (credentials) => http.post('/auth/register', credentials)

const login = (credentials) => http.post('/auth/login', credentials)

export  {
    register,
    login
}