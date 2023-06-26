import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ordersService} from "../../services/ordersService";

let initialState = {
    orders: [],
    comments: [],
    prev: null,
    next: null,
    errors: null,
    loading: null
};
const getAll = createAsyncThunk (
    "carSlice/getAll",
    async ({page, query, filt}, thunkAPI)=>{
        try {
            const {data} = await ordersService.getAll(page, query, filt);
            return data
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
const getAllComments = createAsyncThunk (
    "carSlice/getAllComments",
    async (id, thunkAPI)=>{
        try {
            const {data} = await ordersService.getAllComments(id);
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
            state.orders = action.payload
        },
            [getAllComments.fulfilled]: (state, action)=>{
            state.comments = action.payload
            }
    }
    })

const {reducer: ordersReducer} = ordersSlice;

const ordersAction = {
    getAll,
    getAllComments
}
export {
    ordersReducer,
    ordersAction
}