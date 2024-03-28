import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: "7%",
                    paddingBottom: 10
                }
            }}
        >

            <Tabs.Screen
                name='index'
                options={{
                    tabBarLabel: "Dashbord"
                }}
            />
            <Tabs.Screen
                name='cases'
                options={{
                    tabBarLabel: "Cases"
                }}
            />
            <Tabs.Screen
                name='chatGPT'
                options={{
                    tabBarLabel: "Chat GPT"
                }}
            />
        </Tabs>
    );
};

export default _layout;