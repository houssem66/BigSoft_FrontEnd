import axios from "axios";
import authService from "./AuthServices";
import authHeader from "./HeaderServices";
const API_URL = "https://localhost:44353/api/Client";
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
const GetList = () => {



  return axios.get(API_URL+"/"+user.id, config);
};
const Delete = (id) => {



  return axios.delete(API_URL + "/" + id, config);
};
const Put = (item) => {



  return axios.put(API_URL + "/Update", item, config);
};
const clientService = {
  ajout, GetList, Delete, Put
};
export default clientService;