import axiosConfig from '../config/axiosConfig'

export const apiGetCurrentUser = () => new Promise(async (resolve, reject) => {
   try {
      const response = axiosConfig({
         method: 'GET',
         url: '/api/v1/user/get-current'
      })
      resolve(response)
   } catch (error) {
      reject(error)
   }
})