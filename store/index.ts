// external import

import { configureStore } from "@reduxjs/toolkit";


// internal import
import userReducer from "./slices/userSlice";
import problemListReducer from "./slices/problemListSlice";


const store = configureStore({
    reducer: {
        userInfo: userReducer,
        problemList: problemListReducer
    },
});


export default store;