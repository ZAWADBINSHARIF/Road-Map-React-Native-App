import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BackBtn from '@/components/BackBtn';

const settings = () => {
    return (
        <SafeAreaView>

            <BackBtn />

            <View>
                <Text>settings</Text>
            </View>


            <StatusBar style='dark' />
        </SafeAreaView>
    );
};

export default settings;