import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://connectify-0oy0.onrender.com/api",
    withCredentials : true,
});
