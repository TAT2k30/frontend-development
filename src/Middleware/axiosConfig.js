import axios from 'axios';

const axiosRequest = axios.create({
    baseURL: 'http://localhost:5157/api'
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