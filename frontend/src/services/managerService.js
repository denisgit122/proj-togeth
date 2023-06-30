import {urlsManager} from "../configs";
import {axiosService} from "./axiosService";

const managerService ={
    getAll:()=> axiosService.get(urlsManager.manager.gerAll)
}
export {
    managerService
}