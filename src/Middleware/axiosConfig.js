import axios from 'axios';
import { baseUrl } from '../Assets/Data/baseUrl';

const axiosRequest = axios.create({
    baseURL: baseUrl
});

axiosRequest.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
axiosRequest.interceptors.response.use(
    response => response.data,
    error => {
        console.log("custom",error);
        return Promise.reject(error);
    }
);
export default axiosRequest;