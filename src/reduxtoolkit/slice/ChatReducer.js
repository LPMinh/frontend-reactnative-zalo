import { createSlice } from "@reduxjs/toolkit";
import { ro } from "react-native-paper-dates";


const appChatSlice= createSlice(
    {
        initialState: {
            messages:[],
            user: {},
            receiver: {},
            listRoom: [],
        },
        name: 'groupChat',
        reducers: {
            setChat: (state, action) => {
                state.messages=action.payload;
            },
            addChat: (state, action) => {
                state.messages.push(action.payload);
            },
            updateChat: (state, action) => {
                state.messages = state.messages.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                });
            },
            setUser: (state, action) => {
                state.user = action.payload;
            },
            setReceiver: (state, action) => {
                state.receiver = action.payload;
            },
            setListRoom: (state, action) => {
                console.log(action.payload);
                state.listRoom = action.payload;
            }
        }
    }
)

export const { setChat, addChat, setUser,setReceiver ,setListRoom,updateChat} = appChatSlice.actions;

const ChatReducer = appChatSlice.reducer;
export default ChatReducer;
