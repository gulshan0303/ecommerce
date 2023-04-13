import axios from "axios";
import { config } from "../../utils/AxiosConfig";
import { base_url } from "../../utils/BaseUrl";

const createEnquary = async (userData) => {
  const response = await axios.post(`${base_url}enquiry/`,userData);
  if (response.data) {
    return response.data
  } 
  return response.data
};

const contactService ={
    createEnquary,
}

export default contactService;
