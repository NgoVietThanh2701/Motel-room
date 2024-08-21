import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { action } from './actionType'
import { apiGetCurrentUser } from "../services/userService"

const initStateUser = {
   currentUser: {},
   refreshUser: false,
   msg: '',
}

export const getCurrentUser = createAsyncThunk(action.USER_GET_CURRENT, async (__, thunkAPI) => {
   try {
      const response = await apiGetCurrentUser()
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
   }
})

export const userSlice = createSlice({
   name: 'user',
   initialState: initStateUser,
   reducers: {
      resetCurrentUser: (state) => initStateUser
   },
   extraReducers: (builder) => {
      builder.addCase(getCurrentUser.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.currentUser = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
            //state.refreshUser = true
         }
      })
      builder.addCase(getCurrentUser.rejected, (state, action) => {
         //state.refreshUser = true
         console.log(action.error.message + ' >> at get current user')
      })
   }
})
export const { resetCurrentUser } = userSlice.actions
export default userSlice.reducer