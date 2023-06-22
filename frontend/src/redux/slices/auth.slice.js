import {createSlice} from "@reduxjs/toolkit";


let initialState = {
    errors: null,
    loading: null
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {}
    })

const {reducer: authReducer} = authSlice;

const authAction = {

}
export {
    authReducer,
    authAction
}