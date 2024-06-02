import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import useSecureStore from '@/hooks/useSecureStore';
import { removeLocalStorageThunk } from '@/store/slices/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoreState } from '@/store';


const index = () => {


    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: StoreState) => state.userInfo);
    const { removeToken } = useSecureStore();


    const handleLogout = async () => {
        await removeToken('token');
        dispatch(removeLocalStorageThunk('@userInfo') as any);
    };

    return (
        <View>
            <StatusBar style='dark' />

            <Text style={{ fontSize: 32 }}>{userInfo?.email}</Text>

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