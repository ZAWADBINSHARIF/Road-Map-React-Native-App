import { View, Text, StyleSheet } from 'react-native';
import React from 'react';



const settings = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>settings</Text>
        </View>
    );
};

export default settings;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    }
});