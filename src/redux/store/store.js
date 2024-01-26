import { configureStore, createStore } from "@reduxjs/toolkit";
import appReducer from "../slice/slice";


const store= configureStore({
    reducer:{
        appChat: appReducer
    }
})
export default store;