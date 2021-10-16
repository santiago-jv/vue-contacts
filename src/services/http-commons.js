
import axios from "axios";

let http;

http = axios.create ({
    baseURL:'https://contacts-api-laravel.herokuapp.com/api/',
    headers : {
         'Content-type': 'application/json'
    }
})

export default http