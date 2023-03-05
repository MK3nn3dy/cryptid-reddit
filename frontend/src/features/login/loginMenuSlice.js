import { createSlice } from "@reduxjs/toolkit";

const loginMenuSlice = createSlice({
    name: 'login',
    initialState: {
        loginVisible: false,
        signupVisible: false
    },
    reducers: {
        toggleLogin: (state, action) => {
            state.loginVisible = action.payload
        },
        toggleSignin: (state, action) => {
            state.signupVisible = action.payload
        },
    }
})

export const {
    toggleLogin,
    toggleSignin
} = loginMenuSlice.actions;

export default loginMenuSlice.reducer;