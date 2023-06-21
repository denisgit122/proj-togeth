import axios from "axios";

import {urlsAuth} from "../configs";


axios.interceptors.request.use((config)=>{
    if (authService.isAuthenticated()) {
        const token = authService.getAccessToken();
        config.headers.Authorization =  `Bearer ${token}`
    }
    return config
})


const accessToken = "access";
const authService = {

  login: async function (data){
   const response = await axios.post(urlsAuth.auth.login, data);
   if (response.status === 200){
     this.setTokens(response.data)
   }
   return response;
  },

  setTokens:({token})=>{
    localStorage.setItem(accessToken, token )
  },
  getAccessToken:()=> localStorage.getItem(accessToken),

  deletesToken:()=>{
    localStorage.removeItem(accessToken)
  },
  isAuthenticated:()=> !!localStorage.getItem(accessToken)

}
export {
  authService
}