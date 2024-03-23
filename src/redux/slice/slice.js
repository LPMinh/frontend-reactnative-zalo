import { createSlice } from "@reduxjs/toolkit";

const appChatSlice= createSlice(
    {
        initialState: {
            chat: [],
            user: {
                id: '1',
                phone: '123456789',
                name: 'Nguyen Van A',
                status: 'Online',
                avatar: 'https://i.pinimg.com/originals/5e/7b/8c/5e7b8c4e1b3e8c5e0f2b7d2e7f6d3d9d.jpg'
            },
            emoji:"",
           
        },
        name: 'appChat',
        reducers: {
            setChat: (state, action) => {
                state.chat = action.payload
            },
            setUser: (state, action) => {
                state.user = action.payload
            },
            setEmoji: (state, action) => {
                state.emoji = action.payload
            }
        }
    }
)
export const { setChat, setUser,setEmoji } = appChatSlice.actions
const appReducer = appChatSlice.reducer;
export default appReducer;
