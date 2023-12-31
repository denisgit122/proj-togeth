const baseURL = "http://localhost:3200"

const urlsAuth ={
        auth:{
          login: '/auth/login',
          refresh : '/auth/refresh',
          forgotPassword: `/auth/forgot/password`,
        }

}
const urlsOrders ={
    orders:{
        getAll: '/orders',
        getAllComments:(id)=> `/orders/${id}/comments`,
        postComments:(id)=> `/orders/${id}/comment`,
        updateOrder:(id)=> `/orders/${id}`,

    }

}
const urlsGroup = {
    group:{
        getAll: '/orders/groups',
        addGroup: '/orders/create/group'
    }
}
const urlsManager = {
    manager:{
        gerAll: '/managers',
        create: '/managers/create',
        update:(id)=> `/managers/${id}`,
    }
}
export {urlsAuth, urlsOrders, urlsGroup, urlsManager, baseURL}