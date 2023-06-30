import axios from "axios"
import {baseURL} from "../configs";
import {authService} from "./authService";

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config)=>{
    if (authService.isAuthenticated()) {
        const token = authService.getAccessToken();

        config.headers.Authorization = `${token}`
    }
    return config
});

let isRefreshing = false;

axiosService.interceptors.response.use(config=>{
        return config;
    },
    async (error)=>{

        let orRequest = error.config;

        if (error.response?.status === 401 && !isRefreshing){
            isRefreshing = true
            try {
                await authService.refresh();

                return axiosService(orRequest);

            }catch (e) {

                // authService.deletesToken();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);

    }
)
export {
    axiosService
}