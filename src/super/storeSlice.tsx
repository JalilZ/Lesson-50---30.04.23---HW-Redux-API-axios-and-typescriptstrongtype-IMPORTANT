import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
// import { fetchCount } from './storeAPI.ts';
// import { ProdType } from "./Prodtype"; //default makes it that import is without {}
import ProdType from './Prodtype';

import { GETproducts } from './storeAPI.ts';
import { POSTproduct } from './storeAPI.ts';
import { UPDATEproduct } from './storeAPI.ts';
import { DELproduct } from './storeAPI.ts';

export interface ProductState {
    products: Array<ProdType>;
  }

const initialState: ProductState = {
    products: [],
}


export const getProductAsync = createAsyncThunk(
    'product/GETproducts',
    async () => {
      const response = await GETproducts();
    return response.data
    }
  );

export const addProductAsync = createAsyncThunk(
  'product/POSTproducts',
  async (prod: ProdType) => {
    const response = await POSTproduct(prod);
  return response.data
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/UPDATEproduct',
  async (prod: ProdType) => {
    const response = await UPDATEproduct(prod);
  return response.data
  }
);

export const deleteProductAsync = createAsyncThunk(
  'product/DELproduct',
  async (id: number) => {
    const response = await DELproduct(id);
  return response.data
  }
);

export const productSlice = createSlice({
name: 'product',
initialState,
reducers: {
    
    
},

extraReducers: (builder) => {
    builder
    .addCase(getProductAsync.fulfilled, (state, action) => {
      // console.log(state.products)
      state.products = action.payload
      
    })
    .addCase(addProductAsync.fulfilled, (state, action) => {
      // console.log(state.products)
      state.products.push(action.payload)
    })
    .addCase(updateProductAsync.fulfilled, (state, action) => {
      let item = state.products.filter(item => item.id === action.payload.id)[0]; //find mathcing element (we will always find one)
      const indexToUpdate: number = state.products.indexOf(item);
      state.products[indexToUpdate].desc = action.payload.desc
      state.products[indexToUpdate].price = action.payload.price
    })
    .addCase(deleteProductAsync.fulfilled, (state, action) => {
      let item = state.products.filter(item => item.id === action.payload.id)[0]; //find mathcing element (we will always find one)
      const indexToRemove: number = state.products.indexOf(item);
      state.products.splice(indexToRemove, 1);
      
    })
    
},
});

export const {  } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.products;



export default productSlice.reducer;

