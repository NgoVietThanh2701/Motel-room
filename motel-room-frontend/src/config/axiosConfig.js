import axios from "axios";
import { apiRefresh } from "../services/authService";

const instance = axios.create({
   baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(async function (config) {
   /* Do something before is request sent */
   /* Add token in header */
   const token = localStorage.getItem('persist:auth')
      && JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1, -1);
   config.headers = {
      authorization: `Bearer ${token}`
   }
   return config;
}, function (error) {
   /* Do something with request error */
   return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
   /* Any status code that lie within the range of 2xx cause this function to trigger
   Do something with response data  */
   /* refresh token */
   return response;
}, function (error) {
   return Promise.reject(error);
});

export default instance