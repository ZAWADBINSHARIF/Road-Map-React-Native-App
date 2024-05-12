import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Colors from '@/constants/Colors';



const DrawerLayout = () => {
    return (

        <GestureHandlerRootView style={{ flex: 1 }}>

            <Drawer screenOptions={{
                headerTitleStyle: false,
                headerShadowVisible: false,
                headerTintColor: Colors.SecondBackground,
                headerTitle: ''
            }}
            >

                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: '',
                        headerTitleStyle: false,
                        headerShadowVisible: false
                    }}
                />
                <Drawer.Screen name='all_sections' options={{
                    "title": "All Sections"
                }} />
                <Drawer.Screen name="settings" />

            </Drawer>



        </GestureHandlerRootView >

    );
};

export default DrawerLayout;