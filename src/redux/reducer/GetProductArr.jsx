import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productArr:[]
}

const GetProductArr = createSlice({
  name: 'GetProductArr',
  initialState,
  reducers: {
    getProductArr:(state,action)=>{

        return state.productArr = [...state.productDetail,action.payload]
    }
  }
});

export const {} = GetProductArr.actions

export default GetProductArr.reducer