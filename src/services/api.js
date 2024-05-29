import axios from 'axios';
const URL_SERVER = 'http://localhost:3003/';
// fazendo a conexão com o backend pelo axios 
const api = axios.create({


    baseURL: URL_SERVER
});

export default api;