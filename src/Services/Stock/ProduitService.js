import axios from "axios";
import authHeader from "../HeaderServices";
import authService from "../AuthServices";

const user = authService.getCurrentUser();

const API_URL = "https://localhost:44353/api/Produit";


const ajout = (Produit) => {
  const config = {
    headers: authHeader()
  };
    return axios
   
      .post(API_URL + "/Post?id="+user.id, Produit,config)
      .then((response) => {
        if (response.data) {
         
          console.log(response.data)
        }
  
        return response.data;
      });
  };
  const GetList=(params)=>{
   
    const config = {
      headers: authHeader()
    };
    
    return axios.get(API_URL+"?id="+user.id+"&include="+params.include,config);
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
    
    return  axios.put(API_URL+"/Update?id="+item.id,item,config);
  };
  
  const ProduitService = {
    ajout,GetList,Delete,Put
  };
  export default ProduitService;