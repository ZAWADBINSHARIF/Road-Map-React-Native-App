import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import GenerateAlgorithmSection from './Admin/GenerateAlgorithmSection';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const adminCases = () => {
    return (
        <View style={styles.mainContainer}>


            {/* <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                keyboardVerticalOffset={60}
            > */}

            
            <View style={styles.createdAlgorithmListSection}>
                <ScrollView>

                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                </ScrollView>
            </View>

            <GenerateAlgorithmSection />

            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingBottom: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name="left" size={20} color={Colors.RoundBtnText} />
                    <Text style={{ color: Colors.RoundBtnText }}>Perceive</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: Colors.RoundBtnText }}>Next</Text>
                    <AntDesign name="right" size={20} color={Colors.RoundBtnText} />
                </View>
            </View>

            {/* </KeyboardAvoidingView> */}

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