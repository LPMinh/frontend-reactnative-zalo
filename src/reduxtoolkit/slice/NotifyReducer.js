import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


const notifyAddFriendSlice = createSlice({
    initialState: {
        notifyAddFriend: [],
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
        }
    }
});

export const { setNotifyAddFriend, addNotifyAddFriend, removeNotifyAddFriend } = notifyAddFriendSlice.actions;
export const notifyAddFriendReducer = notifyAddFriendSlice.reducer;


