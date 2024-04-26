import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';



const DrawerLayout = () => {
    return (

        <GestureHandlerRootView style={{ flex: 1 }}>

            <Drawer screenOptions={{
                headerTitleStyle: false,
                headerShadowVisible: false,
                headerTintColor: Colors.SecondBackground,
            }}
            >
                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: '',
                        headerTitleStyle: false
                    }}
                />
                <Drawer.Screen name="settings" options={{ headerShown: false }} />
            </Drawer>

        </GestureHandlerRootView >

    );
};

export default DrawerLayout;