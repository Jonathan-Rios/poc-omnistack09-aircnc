import axios from 'axios';
import utils from './utils';

console.log( utils );

const api = axios.create({
    baseURL: utils.serverURL(),
});

export default api;