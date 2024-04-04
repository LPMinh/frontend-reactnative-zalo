import { configureStore, createStore } from "@reduxjs/toolkit";
import ChatReducer from "../slice/ChatReducer";
import LoginReducer from "../slice/LoginReducer";


const store= configureStore({
    reducer:{
        appChat: ChatReducer,
        login: LoginReducer
    }
})
export default store;