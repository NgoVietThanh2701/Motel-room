import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action } from './actionType'
import { apiRegister, apiLogin, apiRefresh } from "../services/authService";

const initState = {
   isLoggedIn: false,
   token: null,
   refresh_token: null,
   refresh_expired: false,
   msg: "",
   update: false,
}

export const register = createAsyncThunk(action.AUTH_REGISTER, async (dataRegistry, thunkAPI) => {
   try {
      const response = await apiRegister(dataRegistry)
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

/*createAsyncThunk(): create async action*/
export const login = createAsyncThunk(action.AUTH_LOGIN, async (dataLogin, thunkAPI) => {
   try {
      const response = await apiLogin(dataLogin)
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const refreshTokenFunc = createAsyncThunk(action.AUTH_REFRESH_TOKEN, async (refreshToken, thunkAPI) => {
   try {
      const response = await apiRefresh(refreshToken)
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState: initState,
   /* sync action */
   reducers: {
      resetAuth: (state) => initState
   },
   /* async action */
   extraReducers: (builder) => {
      /* register */
      builder.addCase(register.fulfilled, (state, action) => { /*current state and action receiver*/
         if (action.payload?.err) {
            state.isLoggedIn = false;
            state.msg = action.payload.msg;
            state.update = !state.update
         } else {
            state.isLoggedIn = true;
            state.token = action.payload.token
            state.refresh_token = action.payload.refreshToken
         }
      });
      builder.addCase(register.rejected, (state, action) => {
         console.log(action.error.message + ' >> at register auth')
      })
      /* login */
      builder.addCase(login.fulfilled, (state, action) => {
         if (action.payload?.err) {
            state.isLoggedIn = false;
            state.msg = action.payload.msg;
            state.update = !state.update
         } else {
            state.isLoggedIn = true;
            state.token = action.payload.token
            state.refresh_token = action.payload.refreshToken
         }
      })
      builder.addCase(login.rejected, (state, action) => {
         console.log(action.error.message + ' >> at login auth')
      })
      /* refresh */
      builder.addCase(refreshTokenFunc.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.token = action.payload.token
            state.isLoggedIn = true
         } else {
            state.isLoggedIn = false
            state.msg = action.payload.msg
         }
      })
      builder.addCase(refreshTokenFunc.rejected, (state, action) => {
         state.refresh_expired = true
         console.log(action.error.message + ' >> at refresh token')
      })
   }
})

export const { resetAuth } = authSlice.actions; /* export action */
export default authSlice.reducer;