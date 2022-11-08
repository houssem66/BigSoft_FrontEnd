import axios from "axios";
import authService from "../AuthServices";
import authHeader from "../HeaderServices";
const API_URL = "https://localhost:44353/api/BonCommandeFournisseur";
const user = authService.getCurrentUser();

const config = {
    headers: authHeader()
};
const ajout = (client) => {
    client.idGrossiste = user.id;
    return axios

        .post(API_URL + "/Post", client, config)
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
const Delete = (id) => {



    return axios.delete(API_URL + "/" + id, config);
};
const Put = (item) => {

    console.log("item", item)
    return axios.put(API_URL + "/Update?id=" + item.id, item, config);
};
const GetById=(id)=>{
  
   
    return  axios.get(API_URL+"/Get/"+id,config);
  };
const BonCommandeService = {
    ajout, GetList, Delete, Put,GetById
};
export default BonCommandeService;