import { configureStore, createStore } from "@reduxjs/toolkit";
import ChatReducer from "../slice/ChatReducer";
import LoginReducer from "../slice/LoginReducer";
import { notifyAddFriendReducer } from "../slice/NotifyReducer";
import groupChatReducer from "../slice/ChatReducer";
import CallReducer from "../slice/CallReducer";



const store= configureStore({
    reducer:{
        appChat: ChatReducer,
        login: LoginReducer,
        notifyAddFriend: notifyAddFriendReducer,
        groupChat: groupChatReducer,
        appCall: CallReducer,
    }
});
export default store;