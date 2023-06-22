import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit";

import {authReducer} from "./slices/auth.slice";
import {ordersReducer} from "./slices/orders.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    orders : ordersReducer,
})

const setUpStore = () => configureStore({
    reducer: rootReducer
})

export {
    setUpStore
}