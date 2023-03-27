import axios from "axios";

export const fetchData=(skip=0)=>axios.get(`https://dummyjson.com/products?limit=8&skip=${skip}`)

export const url=(id)=>axios.get(`https://dummyjson.com/products/${id}`)