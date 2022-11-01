import axios from "axios";
import authService from "../AuthServices";
import authHeader from "../HeaderServices";
const user = authService.getCurrentUser();

const API_URL = "https://localhost:44353/api/Devis";

const config = {
  headers: authHeader()
};
const ajout = (item) => {
  
    return axios
   
      .post(API_URL + "/Post", item,config)
      .then((response) => {
        if (response.data) {
         
          console.log(response.data)
        }
  
        return response.data;
      });
  };
  const GetList = (params) => {

    params.id = user.id;

    return axios.get(API_URL + "?id=" + params.id+"&include="+params.include, config);
};
  const Delete=(id)=>{
   
  
    
    return  axios.delete(API_URL+"/"+id,config);
  };
  const Put=(item)=>{
  
   
    return  axios.put(API_URL+"/Update/"+item.id,item,config);
  };

  
  const ProduitService = {
    ajout,GetList,Delete,Put
  };
  export default ProduitService;