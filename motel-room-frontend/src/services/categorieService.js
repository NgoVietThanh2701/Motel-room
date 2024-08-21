import axiosConfig from '../config/axiosConfig'

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
   try {
      const response = axiosConfig({
         method: 'GET',
         url: '/api/v1/category/all'
      })
      resolve(response)
   } catch (error) {
      reject(error)
   }
})