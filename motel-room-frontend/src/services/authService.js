import axiosConfig from '../config/axiosConfig'
import axios from 'axios';

export const apiRegister = (dataRegistry) => new Promise(async (resolve, reject) => {
   try {
      const response = await axiosConfig({
         method: 'POST',
         url: '/api/v1/auth/register',
         data: dataRegistry
      });
      resolve(response)
   } catch (error) {
      reject(error)
   }
})

export const apiLogin = (dataLogin) => new Promise(async (resolve, reject) => {
   try {
      const response = await axiosConfig({
         method: 'POST',
         url: '/api/v1/auth/login',
         data: dataLogin
      });
      resolve(response)
   } catch (error) {
      reject(error)
   }
})

export const apiRefresh = (refreshToken) => new Promise(async (resolve, reject) => {
   try {
      const response = await axios({
         method: 'POST',
         url: 'http://localhost:5000/api/v1/auth/refresh-token',
         data: { refreshToken }
      });
      resolve(response)
   } catch (error) {
      reject(error)
   }
})