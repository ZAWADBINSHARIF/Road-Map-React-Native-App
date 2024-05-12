import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import React from 'react';


const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    paddingBottom: 10,
                    minHeight: "8%"
                },
                headerShown: false,
            }}
        >

            <Tabs.Screen
                name='index'
                options={{
                    tabBarLabel: "Dashboard",
                    tabBarIcon: () => <MaterialCommunityIcons name="view-dashboard-outline" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name='cases'
                options={{
                    tabBarLabel: "Cases",
                    tabBarIcon: () => <Ionicons name="briefcase-outline" size={24} color="black" />
                }}
            />
            <Tabs.Screen
                name='chatGPT'
                options={{
                    tabBarLabel: "Chat GPT",
                    tabBarIcon: () => <Image source={require('@/assets/icons/chat_gpt_logo.png')} style={{ width: 24, height: 24 }} />
                }}
            />
        </Tabs>
    );
};

export default _layout;