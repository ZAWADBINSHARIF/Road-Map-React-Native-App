import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native-paper';
import { useGlobalContext } from '@/context/GlobalContext';


const InternetConnectionError = () => {

    const { handleReload }: any = useGlobalContext();

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <MaterialIcons name="signal-wifi-connected-no-internet-4" size={85} color="#106ebe" />
            <Text>No Internet Connection</Text>
            <Button textColor='white' icon={'reload'} mode='contained' onPress={() => handleReload()}>
                <Text>Try again</Text>
            </Button>
        </View>
    );
};

export default InternetConnectionError;


const styles = StyleSheet.create({
    container: {
        'height': '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
});