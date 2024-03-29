import { configureStore, createStore } from "@reduxjs/toolkit";
import ChatReducer from "../slice/chatReducer";



const store= configureStore({
    reducer:{
        appChat: ChatReducer
    }
})
export default store;