import axios from "axios";
import {urlsOrders} from "../configs";

const ordersService =  {
  getAll: (page= 1)=>axios.get(urlsOrders.orders.getAll, {params:{page}})
}
export {
    ordersService
}