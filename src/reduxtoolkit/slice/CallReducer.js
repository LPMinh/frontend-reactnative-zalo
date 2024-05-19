import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
    initialState:{
        sdp: null,
    }
    ,
    name: 'appCall',
    reducers: {
        setSdp: (state, action) => {
            state.sdp = action.payload;
        }
    }
})
export const { setSdp } = callSlice.actions;
const CallReducer = callSlice.reducer;
export default CallReducer;