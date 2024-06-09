// external import
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, UseSelector } from 'react-redux';


// internal import
import useSecureStore from '@/hooks/useSecureStore';
import { getLocalStorageThunk, removeLocalStorageThunk, setLocalStorageThunk } from '@/store/slices/userSlice';
import LocalStorage from '@/app/utilities/LocalStorage';



interface GlobalState {
    isError: boolean,
    isLoading: boolean,
    isConnected: boolean | null;
}

const globalState: GlobalState = {
    isError: false,
    isLoading: true,
    isConnected: null
};

const GlobalContext = createContext(globalState);
export const useGlobalContext = () => useContext(GlobalContext);


const GlobalProvider = ({ children }: any) => {

    const dispatch = useDispatch();
    const { getToken } = useSecureStore();
    const [token] = useState(async () => await getToken('token'));
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isConnected } = useNetInfo();


    axios.interceptors.request.use(async config => {

        if (await token) {
            config.headers.Authorization = `Bearer ${await token}`;
        }

        return config;
    });

    useEffect(() => {

        async function getUserInfo() {
            if (await token) {
                dispatch(getLocalStorageThunk('@userInfo') as any);
            }

            setIsLoading(false);
        }

        getUserInfo();

    }, [token]);





    return (
        <GlobalContext.Provider
            value={{
                isError,
                isLoading,
                isConnected
            }}
        >
            {children}
        </GlobalContext.Provider >
    );
};

export default GlobalProvider;