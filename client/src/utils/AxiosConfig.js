
const getToken = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")):null;
console.log('getToken', getToken?.findUser.token)
export const config = {
    headers:{
        Authorization: `Bearer ${getToken !==null ? getToken?.findUser.token: ""}`,
        Accept:"application/json"
    }
};