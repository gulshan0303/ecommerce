import axios from "axios";
import { config } from "../../utils/AxiosConfig";
import { base_url } from "../../utils/BaseUrl";

const getblogs = async () => {
  const response = await axios.get(`${base_url}blog/all`);
  if (response.data) {
    return response.data
  }
  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data
  }
  return response.data;
};


const blogServise ={
    getblogs,
    getABlog
    
}

export default blogServise;
