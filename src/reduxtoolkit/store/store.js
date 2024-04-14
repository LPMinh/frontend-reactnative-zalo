import { configureStore, createStore } from "@reduxjs/toolkit";
import ChatReducer from "../slice/ChatReducer";
import LoginReducer from "../slice/LoginReducer";
import { notifyAddFriendReducer } from "../slice/NotifyReducer";
import groupChatReducer from "../slice/ChatReducer";



const store= configureStore({
    reducer:{
        appChat: ChatReducer,
        login: LoginReducer,
        notifyAddFriend: notifyAddFriendReducer,
        groupChat: groupChatReducer,
    }
});
export default store;