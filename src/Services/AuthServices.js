import axios from "axios";

const API_URL = "https://localhost:44353/api/";

const signup = (user) => {
 
  return axios
 
    .post(API_URL + "User/Register", user)
    .then((response) => {
      if (response.data.token) {
       console.log("ok")
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (user) => {
  return axios
    .post(API_URL + "User/token", user)
    .then((response) => {
      if (response.data.token) {
       
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;