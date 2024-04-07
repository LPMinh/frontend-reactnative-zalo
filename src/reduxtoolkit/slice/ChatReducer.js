import { createSlice } from "@reduxjs/toolkit";

const appChatSlice= createSlice(
    {
        initialState: {
            messages:[],
            user: {},
            roomId: "",
            receiver: "",
        },
        name: 'appChat',
        reducers: {
            setChat: (state, action) => {
                console.log(action.payload);
                state.messages=action.payload;
            },
            addChat: (state, action) => {
                state.messages.push(action.payload);
            },
            setUser: (state, action) => {
                state.user = action.payload;
            },
            setReceiver: (state, action) => {
                state.receiver = action.payload;
            },
        }
    }
)

export const { setChat, addChat, setUser,setReceiver } = appChatSlice.actions;

const ChatReducer = appChatSlice.reducer;
export default ChatReducer;
