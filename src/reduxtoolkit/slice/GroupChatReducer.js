import { createSlice } from "@reduxjs/toolkit";


const appChatSlice= createSlice(
    {
        initialState: {
            ListMember:[],
            ListGroup: [],
        },
        name: 'groupChat',
        reducers: {
            setListMember: (state, action) => {
                state.ListMember=action.payload;
            },
            addMember: (state, action) => {
                state.ListMember.push(action.payload);
            },
            removeMember: (state, action) => {
                state.ListMember = state.ListMember.filter((item) => item.id !== action.payload.id);
            },
            setListGroup: (state, action) => {
                state.ListGroup = action.payload;
            }

        }
    }
)

export const { setListMember,addMember,removeMember,setListGroup} = appChatSlice.actions;

const groupChatReducer = appChatSlice.reducer;
export default groupChatReducer;
