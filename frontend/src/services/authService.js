import {urlsAuth} from "../configs";
import {axiosService} from "./axiosService";


const accessToken = "access";
const refreshToken = "refresh";
const authService = {

  login: async function (data){
   const response = await axiosService.post(urlsAuth.auth.login, data);

   if (response.status === 200){
     this.setTokens(response.data)
   }
   return response;
  },

    refresh: async function() {
      const refreshTok = this.getRefreshToken();
      if (!refreshTok){
          throw new Error("Refresh token isn't exist")
      }
        console.log(13)
        let {data} = await axiosService.post(urlsAuth.auth.refresh );
        console.log(14)
        console.log(data)
        this.setTokens(data)

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