import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name='login'
                    options={{
                        'headerShown': true
                    }
                    }
                />
                <Stack.Screen
                    name='register'
                    options={{
                        'headerShown': false
                    }
                    }
                />
                <Stack.Screen
                    name='otp_submit'
                    options={{
                        'headerShown': false
                    }
                    }
                />
            </Stack>

            <StatusBar style='light' />
        </>
    );
};

export default Layout;;;