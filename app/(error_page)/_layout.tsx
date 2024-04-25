import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LayoutPage = () => {
    return (
        <>
            <Stack
                screenOptions={{
                    'headerShown': false
                }}
            >
                <Stack.Screen
                    name='index'
                />
            </Stack>
            <StatusBar style='dark' />
        </>
    );
};

export default LayoutPage;