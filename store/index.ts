// external import

import { configureStore } from "@reduxjs/toolkit";


// internal import
import userReducer from "./slices/userSlice";


const store = configureStore({
    reducer: {
        userInfo: userReducer
    },
});


export default store;