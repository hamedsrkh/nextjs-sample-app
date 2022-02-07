import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://wishwork.herokuapp.com/',
});

export default Api