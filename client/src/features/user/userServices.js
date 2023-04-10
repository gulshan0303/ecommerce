import axios from "axios";
import { config } from "../../utils/AxiosConfig";
import { base_url } from "../../utils/BaseUrl";

const register = async (user) => {
  const response = await axios.post(`${base_url}auth/register`, user);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  
  }
  return response.data;
};

const userServises ={
    register,
    login
}

export default userServises;
