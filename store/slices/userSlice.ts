// external import
import { createSlice } from "@reduxjs/toolkit";


// internal import
import LocalStorage from "@/app/utilities/LocalStorage";


const initialState = {
    userInfo: {
        email: '',
        name: '',
        rule: '',
        number: ''
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});


const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;


export function setLocalStorageThunk(key: string, value: string) {
    return async function (dispatch: any) {
        try {

            await LocalStorage.saveData(key, value);
            const convertedObject = JSON.parse(value);
            dispatch(setUserInfo(convertedObject));

        } catch (error) {
            console.log(error);
        }
    };
}

export function getLocalStorageThunk(key: string) {
    return async function (dispatch: any) {
        try {
            const values = await LocalStorage.getData(key);
            dispatch(setUserInfo(values));

        } catch (error) {
            console.log(error);
        }
    };
}

export function removeLocalStorageThunk(key: string) {
    return async function (dispatch: any) {
        try {
            await LocalStorage.removeData(key);
            dispatch(setUserInfo([]));

        } catch (error) {
            console.log(error);
        }
    };
}