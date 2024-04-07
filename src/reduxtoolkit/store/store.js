import { configureStore, createStore } from "@reduxjs/toolkit";
import ChatReducer from "../slice/ChatReducer";
import LoginReducer from "../slice/LoginReducer";
import { notifyAddFriendReducer } from "../slice/NotifyReducer";


const store= configureStore({
    reducer:{
        appChat: ChatReducer,
        login: LoginReducer,
        notifyAddFriend: notifyAddFriendReducer,
    }
});
export default store;