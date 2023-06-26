import axios from "axios";
import {urlsOrders} from "../configs";

const ordersService =  {
    getBySearch: (page=1,name, surname, email, phone, age, course, course_format, course_type, status,groups
    )=> axios.get(urlsOrders.orders.getAll,
        {params:{page,'filter.name':name,'filter.surname':surname, 'filter.email':email,
                'filter.phone':phone,'filter.age':age, 'filter.course':course,'filter.course_format':course_format,
                'filter.course_type':course_type,'filter.status':status, 'filter.group':groups,
        }}),

    getAll: (page= 1, query, filt)=> axios.get(urlsOrders.orders.getAll, {params:{page, sortBy: query, filt}}),

    getAllComments: (id)=> axios.get(urlsOrders.orders.getAllComments(id))

}
export {
    ordersService
}