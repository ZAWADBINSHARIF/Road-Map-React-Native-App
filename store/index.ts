// external import

import { configureStore } from "@reduxjs/toolkit";


// internal import
import userReducer from "./slices/userSlice";
import problemListReducer from "./slices/problemListSlice";
import savedCaseReducer from "./slices/savedCaseSlice";




const store = configureStore({
    reducer: {
        userInfo: userReducer,
        problemList: problemListReducer,
        savedCase: savedCaseReducer
    }
});


export default store;