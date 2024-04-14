import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    initialState: {
        user: {}
    },
    name: 'appLogin',
    reducers: {
        setLogin: (state, action) => {
        state.login = action.payload;
        },
        setUser: (state, action) => {
        state.user = action.payload;
        }
    }
    });
export const { setLogin, setUser } = loginSlice.actions;
const LoginReducer = loginSlice.reducer;
export default LoginReducer;