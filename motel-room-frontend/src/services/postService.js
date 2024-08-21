import axiosConfig from '../config/axiosConfig'

export const apiGetPosts = () => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'GET',
         url: '/api/v1/post/all'
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})

export const apiGetPostsLimit = (query) => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'GET',
         url: `/api/v1/post/limit`,
         params: query
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})

export const apiGetNewPosts = () => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'GET',
         url: `/api/v1/post/new-post`,
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})

export const apiCreatePost = (payload) => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'POST',
         url: `/api/v1/post/create-new`,
         data: payload,
         headers: { "Content-type": "multipart/form-data", }
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})

export const apiGetPostsLimitAdmin = (query) => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'GET',
         url: `/api/v1/post/limit-admin`,
         params: query
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})

export const apiDeletePostsLimitAdmin = (postId) => new Promise(async (resolve, rejcet) => {
   try {
      const response = await axiosConfig({
         method: 'delete',
         url: `/api/v1/post/delete`,
         params: { postId }
      })
      resolve(response)
   } catch (error) {
      rejcet(error)
   }
})



