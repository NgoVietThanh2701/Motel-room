import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiGetCategories } from "../services/categorieService";
import { apiGetPrices, apiGetAreas, apiGetProvinces } from "../services/appService";
import { action } from './actionType'

const initStateApp = {
   categories: [],
   prices: [],
   areas: [],
   provinces: [],
   msg: '',
}

export const getCategories = createAsyncThunk(action.APP_GET_CATEGORIES, async (__, thunkAPI) => {
   try {
      const response = await apiGetCategories();
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const getPrices = createAsyncThunk(action.APP_GET_PRICES, async (__, thunkAPI) => {
   try {
      const response = await apiGetPrices();
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const getAreas = createAsyncThunk(action.APP_GET_AREAS, async (__, thunkAPI) => {
   try {
      const response = await apiGetAreas();
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const getProvinces = createAsyncThunk(action.APP_GET_PROVINCES, async (__, thunkAPI) => {
   try {
      const response = await apiGetProvinces();
      return response.data
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
})

export const appSlice = createSlice({
   name: 'app',
   initialState: initStateApp,
   extraReducers: (builder) => {
      /* get categories  */
      builder.addCase(getCategories.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.categories = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getCategories.rejected, (state, action) => {
         console.log(action.err.message + ' >> at get categories')
      })
      /* get prices  */
      builder.addCase(getPrices.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.prices = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getPrices.rejected, (state, action) => {
         console.log(action.err.message + ' >> at get prices')
      })
      /* get areas  */
      builder.addCase(getAreas.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.areas = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getAreas.rejected, (state, action) => {
         console.log(action.err.message + ' >> at get areas')
      })
      /* get provinces  */
      builder.addCase(getProvinces.fulfilled, (state, action) => {
         if (!action.payload.err) {
            state.provinces = action.payload.response
            state.msg = action.payload.msg
         } else {
            state.msg = action.payload.msg
         }
      })
      builder.addCase(getProvinces.rejected, (state, action) => {
         console.log(action.err.message + ' >> at get provinces')
      })
   }
})

export default appSlice.reducer