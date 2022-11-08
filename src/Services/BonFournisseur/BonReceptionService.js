import axios from "axios";
import authService from "../AuthServices";
import authHeader from "../HeaderServices";
const user = authService.getCurrentUser();

const API_URL = "https://localhost:44353/api/BonReception";

const config = {
  headers: authHeader()
};
const ajout = (BonReception) => {
  
    return axios
   
      .post(API_URL + "/Post", BonReception,config)
      .then((response) => {
        if (response.data) {
         
          console.log(response.data)
        }
  
        return response.data;
      });
  };
  const GetList = (params) => {

    params.id = user.id;

    return axios.get(API_URL + "?id=" + params.id+"&include="+params.include+"&iDC="+params.iDC, config);
};
  const Delete=(id)=>{
   
  
    
    return  axios.delete(API_URL+"/"+id,config);
  };
  const Put=(item)=>{
  
   
    return  axios.put(API_URL+"/Update/"+item.id,item,config);
  };
    const Confirm=(item)=>{
    
    
    return  axios.put(API_URL+"/Confirmer?id="+item,item,config);
  };
  const GetById=(id)=>{
  
   
    return  axios.get(API_URL+"/Get/"+id,config);
  };
  const ProduitService = {
    ajout,GetList,Delete,Put,Confirm,GetById
  };
  export default ProduitService;