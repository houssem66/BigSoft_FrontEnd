import axios from "axios";
import authHeader from "../HeaderServices";
import authService from "../AuthServices";

const API_URL = "https://localhost:44353/api/Stock";
const user = authService.getCurrentUser();

const config = {
  headers: authHeader()
};
const ajout = (Stock) => {
  
    return axios
   
      .post(API_URL + "/Post", Stock,config)
      .then((response) => {
        if (response.data) {
         
          console.log(response.data)
        }
  
        return response.data;
      });
  };
  const GetList=(include)=>{
   
   
    
    return axios.get(API_URL+"?id="+user.id+"&include="+include,config);
  }; 
  const Delete=(id)=>{
   
    
    
    return  axios.delete(API_URL+"/"+id,config);
  };
  const Put=(item)=>{
  
    
    return  axios.put(API_URL+"/Update",item,config);
  };
  
  const StockService = {
    ajout,GetList,Delete,Put
  };
  export default StockService;