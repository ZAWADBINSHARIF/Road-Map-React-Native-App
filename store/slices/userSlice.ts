import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserInfo = {
    async getData(key: string) {
        try {
            const stringValue: string | null = await AsyncStorage.getItem(key);
            const values = JSON.parse(stringValue!);
            return values;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async saveData(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async removeData(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
            return;
        }
    }
};

const initialState = {
    userInfo: null
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

            await UserInfo.saveData(key, value);
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
            const values = await UserInfo.getData(key);
            dispatch(setUserInfo(values));

        } catch (error) {
            console.log(error);
        }
    };
}

export function removeLocalStorageThunk(key: string) {
    return async function (dispatch: any) {
        try {
            await UserInfo.removeData(key);
            dispatch(setUserInfo([]));

        } catch (error) {
            console.log(error);
        }
    };
}