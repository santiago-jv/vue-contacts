import http from "./http-commons";
import authHeader from "./http-header";

const register = (credentials) => http.post('/register', credentials)

const login = (credentials) => http.post('/login', credentials)
const getUser = () => http.get('/user', {headers: authHeader()})

export  {
    register,
    login,
    getUser
}