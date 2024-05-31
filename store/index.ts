// external import

import { configureStore } from "@reduxjs/toolkit";


// internal import
import userReducer from "./slices/userSlice";
import commonProperty from "./slices/commonPropertySlice";
import savedCaseReducer from "./slices/savedCaseSlice";




const store = configureStore({
    reducer: {
        userInfo: userReducer,
        commonProperty: commonProperty,
        savedCase: savedCaseReducer
    }
});


export default store;