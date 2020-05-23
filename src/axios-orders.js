import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myreact-burger-e2514.firebaseio.com/'
});

export default instance;