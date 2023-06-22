import axios from "axios";
import {urlsAuth} from "../configs";

axios.interceptors.request.use((config)=>{
    if (authService.isAuthenticated()) {
        const token = authService.getAccessToken();
        config.headers.Authorization = `${token}`
    }
    return config
})


const accessToken = "access";
const refreshToken = "refresh";
const authService = {

  login: async function (data){
   const response = await axios.post(urlsAuth.auth.login, data);
   if (response.status === 200){
     this.setTokens(response.data)
   }
   return response;
  },

  setTokens:({tokenPair})=>{
      localStorage.setItem(accessToken, tokenPair.accessToken )
      localStorage.setItem(refreshToken,tokenPair.refreshToken )

  },
  getAccessToken:()=> localStorage.getItem(accessToken),
  getRefreshToken:()=> localStorage.getItem(refreshToken),

  deletesToken:()=>{
    localStorage.removeItem(accessToken)
    localStorage.removeItem(refreshToken)

  },
  isAuthenticated:()=> !!localStorage.getItem(accessToken)

}
export {
  authService
}