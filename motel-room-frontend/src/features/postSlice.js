import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGetPosts, apiGetPostsLimit, apiGetNewPosts, apiGetPostsLimitAdmin } from "../services/postService"
import { action } from './actionType'

const initStatePost = {
   newPosts: [],
   posts: [],
   postsOfCurrentUser: [],
   count: 0,
   countCurrentUser: 0,
   lengthPage: 0,
   msg: '',
}

export const getPosts = createAsyncThunk(action.POST_GET, async () => {
   try {
      const response = await apiGetPosts();
      return response.data
   } catch (error) {
      console.log('Error posts slice: ' + error)
   }
})

export const getPostsLimit = createAsyncThunk(action.POST_GET_LIMIT, async (query, thunkAPI) => {
   try {
      const response = await apiGetPostsLimit(query);
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const getPostsLimitAdmin = createAsyncThunk(action.POST_GET_ADMIN, async (query, thunkAPI) => {
   try {
      const response = await apiGetPostsLimitAdmin(query);
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const getPostsNew = createAsyncThunk(action.POST_GET_NEW, async (__, thunkAPI) => {
   try {
      const response = await apiGetNewPosts();
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const postSlice = createSlice({
   name: 'posts',
   initialState: initStatePost,
   extraReducers: (builder) => {
      /* get posts */
      builder.addCase(getPosts.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.posts = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getPosts.rejected, () => {
         console.log('rejected get posts ')
      })
      /* get posts limit */
      builder.addCase(getPostsLimit.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.posts = action.payload.response.rows
            state.count = action.payload.response.count
            state.msg = action.payload.msg
            state.lengthPage = action.payload.lengthPage
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getPostsLimit.rejected, (state, action) => {
         console.log(action.error.message + ' >> at get postLimit')
      })
      /* get new posts */
      builder.addCase(getPostsNew.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.newPosts = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getPostsNew.rejected, (state, action) => {
         console.log(action.error.message + '>> at get new post')
      })
      /* get limit post admin*/
      builder.addCase(getPostsLimitAdmin.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.postsOfCurrentUser = action.payload.response.rows
            state.countCurrentUser = action.payload.response.count
            state.msg = action.payload.msg
            state.lengthPage = action.payload.lengthPage
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getPostsLimitAdmin.rejected, (state, action) => {
         console.log(action.error.message + ' >> at get postLimit')
      })
   }
})

export default postSlice.reducer