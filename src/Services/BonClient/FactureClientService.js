import axios from "axios";
import authService from "../AuthServices";
import authHeader from "../HeaderServices";
const user = authService.getCurrentUser();

const API_URL = "https://localhost:44353/api/FactureClient";
const config = {
  headers: authHeader()
};


  const GetList=(params)=>{
    params.id=user.id
   
    
    return axios.get(API_URL + "?id=" + params.id+"&include="+params.include+"&idP="+params.idP, config);
    }; 
  const Delete=(id)=>{
   
  
    
    return  axios.delete(API_URL+"/"+id,config);
  };


  
  const FactureService = {
    GetList,Delete
  };
  export default FactureService;