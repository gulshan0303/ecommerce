import axios from "axios";
import { config } from "../../utils/AxiosConfig";
import { base_url } from "../../utils/BaseUrl";

const register = async (user) => {
  const response = await axios.post(`${base_url}auth/register`, user);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data
  }
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  
  }
  return response.data;
};

const logout = async (user) => {
  const response = await axios.get(`${base_url}auth/logout`);
  if (response.data) {
  
    return response.data;
  
  }
  return response.data;
};

//getWishList
const getWishlist = async () => {
  const response = await axios.get(`${base_url}auth/wishlist`,config);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const addToproductCart = async (cartData) => {
  const response = await axios.post(`${base_url}auth/cart`,cartData,config);
  console.log(response)
  if (response.data) {
    console.log('response.data', response.data)
    return response.data
  }
};

const getToCart = async () => {
  const response = await axios.get(`${base_url}auth/cart`,config);
  console.log(response)
  if (response.data) {
    return response.data
  }
};

const userServises ={
    register,
    login,
    logout,
     getWishlist,
     addToproductCart,
     getToCart
}

export default userServises;
