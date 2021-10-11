import axios from "axios";

let http;

http = axios.create ({
    baseURL:'https://contacts-api-mintic.herokuapp.com/api/',
    headers : {
         'Content-type': 'application/json'
    }
})

export default http