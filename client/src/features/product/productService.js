import axios from "axios";
import { config } from "../../utils/AxiosConfig";
import { base_url } from "../../utils/BaseUrl";

const getProducts = async (user) => {
  const response = await axios.get(`${base_url}product/all`);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const addWishlist = async (productId) => {
  const response = await axios.put(`${base_url}product/wishlist`,{productId},config);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const productServise ={
    getProducts,
    addWishlist,
    getAProduct
}

export default productServise;
