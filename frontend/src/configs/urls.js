const urlsAuth ={
        auth:{
          login: '/auth/login'
        }

}
const urlsOrders ={
    orders:{
        getAll: '/orders',
        getAllComments:(id)=> `/orders/${id}/comments`

    }

}
export {urlsAuth, urlsOrders}