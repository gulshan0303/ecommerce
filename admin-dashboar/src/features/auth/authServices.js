import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}auth/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log('response.data', response.data)
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}auth/order/all`, config);
   console.log('response', response)
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}auth/order/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
