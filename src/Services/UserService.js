import axios from "axios";
import authHeader from "./HeaderServices";
const API_URL = "https://localhost:44353/api/User";
const config = {
    headers: authHeader()
  };
const getUser =(email)=>{

    return axios.get(API_URL+"/Get/Email/"+email)
};
const getUserbyUserName =(UserName)=>{

    return axios.get(API_URL+"/Get/UserName/"+UserName)
};
const ChangePassword =(Model)=>{

    return axios.post(API_URL+"/ResetP",Model,config)
};

   const Put=(item)=>{
  
    
    
    return  axios.put(API_URL+"/Update",item,config);
  };
  const userService = {
    getUser,Put,ChangePassword,getUserbyUserName
   };
   export default userService;