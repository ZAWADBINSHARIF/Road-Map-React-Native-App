import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfo = {
    async getData() {
        try {
            const keys: readonly string[] = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);
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
    userInfo: []
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
            const values = await UserInfo.getData();
            const convertedObject = Object.fromEntries(values as any);

            dispatch(setUserInfo(convertedObject));

        } catch (error) {
            console.log(error);
        }
    };
}

export function getLocalStorageThunk() {
    return async function (dispatch: any) {
        try {
            const values = await UserInfo.getData();
            const convertedObject = Object.fromEntries(values as any);

            dispatch(setUserInfo(convertedObject));

        } catch (error) {
            console.log(error);
        }
    };
}

export function removeLocalStorageThunk() {
    return async function (dispatch: any) {
        try {
            await AsyncStorage.clear();
            dispatch(setUserInfo([]));

        } catch (error) {
            console.log(error);
        }
    };
}