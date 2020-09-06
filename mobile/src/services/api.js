import axios from 'axios';

const api = axios.create({
    baseURL: 'http://k9-p2h.anonymous.mobile.exp.direct:3333',
});

export default api;