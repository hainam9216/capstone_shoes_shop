import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productCart:[]
}

const GetProductArr = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    addToCart:(state,action)=>{

      state.productCart.push(action.payload);
    }
  }
});

export const {addToCart} = GetProductArr.actions

export default GetProductArr.reducer