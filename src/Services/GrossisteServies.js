import axios from "axios";
import authHeader from "./HeaderServices";
const API_URL = "https://localhost:44353/api/Grossiste";
const config = {
  headers: authHeader()
  
};
const signup = (user) => {
 
    return axios
   
      .post(API_URL + "/Register", user)
      .then((response) => {
        if (response.data.token) {
         console.log("ok");
          localStorage.setItem("grossiste", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };
  const Put=(file)=>{
    
    
    
    return  axios.put(API_URL+"/Update",file,config);
  };
  const getUserbyUserName =(UserName)=>{

    return axios.get(API_URL+"/Get/UserName/"+UserName)
};
const GetByEmail =(Email)=>{

  return axios.get(API_URL+"/Get/Email/"+Email)
};

const grosssiteService = {
   signup,GetByEmail,getUserbyUserName,Put
  };
  export default grosssiteService;