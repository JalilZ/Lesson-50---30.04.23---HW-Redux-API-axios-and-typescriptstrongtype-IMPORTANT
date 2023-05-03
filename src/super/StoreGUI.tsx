import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
// import { fetchCount } from './counterAPI';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  getProductAsync,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
  selectProduct
 } from './storeSlice';
import { useState } from 'react';


const StoreGUI = () => {
  const prod = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  const [des, setdes] = useState("")
  const [price, setprice] = useState(0)
  
  return (
    <div>
        Description: <input onChange={(e) => setdes(e.target.value)}/> {""}
        Price: <input onChange={(e) => setprice(+e.target.value)}/>
        <button onClick={() => dispatch(addProductAsync({desc: des, price: price}))}>Add Product</button><br/>
        <button onClick={() => dispatch(getProductAsync())}>Get Products</button>
        {prod.map((prod, indx) => 
                                  <div key={(indx)}>
                                    {prod.id} {prod.desc} {prod.price} {""}
                                    <button onClick={() => dispatch(updateProductAsync({id: prod.id, desc: des, price: price}))}>update</button>  {""}
                                    <button onClick={() => {if (prod.id !== undefined) {dispatch(deleteProductAsync(prod.id))}}}>delete</button>  {""}
                                  </div>
                   )
        }
    </div>
  )
}

export default StoreGUI