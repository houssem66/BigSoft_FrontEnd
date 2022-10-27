import axios from "axios";
import authService from "../AuthServices";
import authHeader from "../HeaderServices";
const user = authService.getCurrentUser();

const API_URL = "https://localhost:44353/api/FactureFournisseur";



  const GetList=()=>{
   
    const config = {
      headers: authHeader()
    };
    
    return axios.get(API_URL+"/"+user.id,config);
  }; 
  const Delete=(id)=>{
   
    const config = {
      headers: authHeader()
    };
    
    return  axios.delete(API_URL+"/"+id,config);
  };


  
  const FactureService = {
    GetList,Delete
  };
  export default FactureService;