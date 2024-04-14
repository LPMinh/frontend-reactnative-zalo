import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { addFriend } from "../../api/service/nofityaddfriend";


const notifyAddFriendSlice = createSlice({
    initialState: {
        notifyAddFriend: [],
        friendList: []
    },
    name: 'appNotifyAddFriend',
    reducers: {
        setNotifyAddFriend: (state, action) => {
            state.notifyAddFriend = action.payload;
        },
        addNotifyAddFriend: (state, action) => {
            state.notifyAddFriend.push(action.payload);
        },
        removeNotifyAddFriend: (state, action) => {
            state.notifyAddFriend = state.notifyAddFriend.filter((item) => item.user.email !== action.payload);
        },
        setFriends: (state, action) => {
            state.friendList = action.payload;
        },
        addFriendtoList: (state, action) => {
            state.friendList.push(action.payload);
        },
    }
});

export const { setNotifyAddFriend, addNotifyAddFriend, removeNotifyAddFriend, setFriends, addFriendtoList} = notifyAddFriendSlice.actions;
export const notifyAddFriendReducer = notifyAddFriendSlice.reducer;


