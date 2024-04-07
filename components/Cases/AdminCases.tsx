import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import GenerateAlgorithmSection from './Admin/GenerateAlgorithmSection';

const adminCases = () => {
    return (
        <View style={styles.mainContainer}>


            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                keyboardVerticalOffset={60}
            >

                <View style={styles.createdAlgorithmListSection}>
                    <Text>LIST</Text>
                </View>

                <GenerateAlgorithmSection />

            </KeyboardAvoidingView>

        </View>
    );
};

export default adminCases;


const styles = StyleSheet.create({
    mainContainer: {
        'height': '100%',
    },
    createdAlgorithmListSection: {
        flex: 1
    },

});