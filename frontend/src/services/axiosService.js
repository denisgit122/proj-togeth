import axios from "axios"
import {createBrowserHistory} from "history";

import {baseURL} from "../configs";
import {authService} from "./authService";

const axiosService = axios.create({baseURL});
const history = createBrowserHistory();

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

        const refresh = authService.getRefreshToken();


        if (error.response?.status === 401 && refresh&& !isRefreshing){
            isRefreshing = true
            try {
                await authService.refresh();
                // return axiosService(error.config);

            }catch (e) {

                authService.deletesToken();
                history.replace('/')
                // return Promise.reject(error);
            }
            isRefreshing = false;
            return axiosService(error.config)
        }
        return Promise.reject(error);

    }
)
export {
    axiosService,
    history
}