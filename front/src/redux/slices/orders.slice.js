import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ordersService} from "../../services/ordersService";
import {query} from "express";


let initialState = {
    orders: [],
    prev: null,
    next: null,
    errors: null,
    loading: null
};
const getAll = createAsyncThunk (
    "carSlice/getAll",
    async ({page}, thunkAPI)=>{
        try {
            const {data} = await ordersService.getAll(page);
            return data
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getAll.fulfilled]: (state, action)=>{
            const {page, data} = action.payload
            state.prev = page-1
            state.next = page+1
            state.orders = action.payload
        },
    }
    })

const {reducer: ordersReducer} = ordersSlice;

const ordersAction = {
    getAll,
}
export {
    ordersReducer,
    ordersAction
}