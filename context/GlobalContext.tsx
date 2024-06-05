// external import
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, UseSelector } from 'react-redux';


// internal import
import useSecureStore from '@/hooks/useSecureStore';
import { removeLocalStorageThunk, setLocalStorageThunk } from '@/store/slices/userSlice';



const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);


const GlobalProvider = ({ children }: any) => {

    const dispatch = useDispatch();
    const { getToken } = useSecureStore();
    const token = async () => await getToken('token');
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isConnected } = useNetInfo();


    axios.interceptors.request.use(async config => {

        if (await token()) {
            config.headers.Authorization = `Bearer ${await token()}`;
        }

        return config;
    });

    const handleReload = async () => {

        if (await token()) {
            try {
                setIsLoading(true);
                const response = await axios.get('/verify');

                if (!response) {
                    setIsError(true);
                    throw new Error("Connection lost");
                }

                const userInfoString = JSON.stringify(response.data?.userInfo);

                dispatch(removeLocalStorageThunk('@userInfo') as any);
                dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);

            } catch (error) {
                setIsError(true);
                console.log(error);
            }

            setIsLoading(false);

        } else {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (await token()) {
                try {
                    setIsLoading(true);
                    const response = await axios.get('/verify');

                    if (!response) {
                        setIsError(true);
                        throw new Error("Connection lost");
                    }

                    const userInfoString = JSON.stringify(response.data?.userInfo);

                    dispatch(removeLocalStorageThunk('@userInfo') as any);
                    dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);

                } catch (error) {
                    setIsError(true);
                }

                setIsLoading(false);

            } else {
                setIsLoading(false);
            }
        };

        // fetchUserInfo();

    }, []);





    return (
        <GlobalContext.Provider
            value={{
                isError,
                isLoading,
                isConnected,
                handleReload
            } as any}
        >
            {children}
        </GlobalContext.Provider >
    );
};

export default GlobalProvider;