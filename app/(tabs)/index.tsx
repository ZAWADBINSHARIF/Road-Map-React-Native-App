import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
    return (
        <View>
            <StatusBar style='dark' />

            <Link href={'/(auth)/login'} >
                Login
            </Link>

        </View>
    );
};

export default index;