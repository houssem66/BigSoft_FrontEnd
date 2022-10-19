import axios from "axios";
import authHeader from "./HeaderServices";
const API_URL = "https://localhost:44353/api/Fournisseur";


const ajout = (fournisseur) => {
  const config = {
    headers: authHeader()
  };
    return axios
   
      .post(API_URL + "/Post", fournisseur,config)
      .then((response) => {
        if (response.data) {
         
          console.log(response.data)
        }
  
        return response.data;
      });
  };
  const GetList=()=>{
   
    const config = {
      headers: authHeader()
    };
    
    return axios.get(API_URL,config);
  }; 
  const Delete=(id)=>{
   
    const config = {
      headers: authHeader()
    };
    
    return  axios.delete(API_URL+"/"+id,config);
  };
  const Put=(item)=>{
  
    const config = {
      headers: authHeader()
    };
    
    return  axios.put(API_URL+"/Update",item,config);
  };
  
  const fournisseurService = {
    ajout,GetList,Delete,Put
  };
  export default fournisseurService;