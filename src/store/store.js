import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/authSlice"
import postSlice from "../store/postSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice
    },
})

export default store;