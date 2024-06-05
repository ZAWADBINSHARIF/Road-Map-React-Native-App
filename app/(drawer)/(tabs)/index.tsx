import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Link, router, usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import useSecureStore from '@/hooks/useSecureStore';
import { removeLocalStorageThunk } from '@/store/slices/userSlice';
import { StoreState } from '@/store';
import { BackHandler } from 'react-native';

const index = () => {

    const pathname = usePathname();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: StoreState) => state.userInfo);
    const { removeToken } = useSecureStore();


    const handleLogout = async () => {
        await removeToken('token');
        dispatch(removeLocalStorageThunk('@userInfo') as any);
    };

    console.log(pathname);
    BackHandler.addEventListener('hardwareBackPress', function () {
        if ('/' === pathname)
            BackHandler.exitApp();

        router.back();
        return true;
    });

    return (
        <View>
            <StatusBar style='dark' />

            <Text style={{ fontSize: 32 }}>{userInfo?.email}</Text>
            <Text>{process.env.EXPO_PUBLIC_API_BASE_URL}</Text>

            {userInfo?.email ?
                <TouchableOpacity onPress={handleLogout} >
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity> :
                <Link href={'/(auth)/login'} >
                    Login
                </Link>
            }

        </View>
    );
};

export default index;