// A mock function to mimic making an async request for data
import axios from 'axios';
// import { ProdType } from "./Prodtype"; //default makes it that import is without {}
import ProdType from './Prodtype';

export function GETproducts() {
    return new Promise<{ data: ProdType[] }>((resolve) =>
      axios.get('http://localhost:5000/products').then(res => resolve({data: res.data}))
    );
  }

export function POSTproduct(prod: ProdType) {
  return new Promise<{ data: ProdType }>((resolve) =>
    axios.post('http://localhost:5000/products', prod).then(res => resolve({data: res.data}))
  );
}

export function UPDATEproduct(prod: ProdType) {
  return new Promise<{ data: ProdType }>((resolve) =>
    axios.put(`http://localhost:5000/products/${prod.id}`, prod).then(res => resolve({data: res.data}))
  );
}


export function DELproduct(id: number) {
  return new Promise<{ data: ProdType }>((resolve) =>
   axios.delete(`http://localhost:5000/products/${id}`).then(res => resolve({data: res.data}))
  );
}


  