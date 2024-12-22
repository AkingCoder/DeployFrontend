import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    searchPosts: [],
    deletePopup: false,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        loadPosts: (state, action) => {
            state.posts = action.payload;
        },
        findPosts: (state, action) => {
            state.searchPosts = action.payload;
        },
        toggleDeletePopup: (state, action) => {
            state.deletePopup = !action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadPosts, findPosts, toggleDeletePopup } = postSlice.actions;

export default postSlice.reducer;
