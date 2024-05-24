import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import GenerateAlgorithmSection from './Admin/GenerateAlgorithmSection';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TopButtoms from './Admin/TopButtons/TopButtoms';
import AdminList from './Admin/List/AdminList';
import SavedCase from './Admin/SavedCase';

const adminCases = () => {

    const [topBtnState, setTopBtnState] = useState<'Cases' | 'List'>('Cases');

    return (
        <View style={styles.mainContainer}>

            {/* // ** Top buttoms for Cases and List */}
            <TopButtoms
                topBtnState={topBtnState}
                setTopBtnState={setTopBtnState}
            />

            {
                topBtnState === 'List' &&
                <AdminList />
            }

            {
                topBtnState === 'Cases' &&

                <>

                    <KeyboardAvoidingView
                        style={{
                            flex: 1,
                        }}
                    >

                        <View style={styles.createdAlgorithmListSection}>
                            <ScrollView>

                                <SavedCase />

                            </ScrollView>
                        </View>

                        <View style={[defaultStyles.seperatorView, { marginHorizontal: 0, marginVertical: 10 }]}>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                        </View>


                        <GenerateAlgorithmSection />

                    </KeyboardAvoidingView>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingBottom: 10, paddingTop: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="left" size={20} color={Colors.RoundBtnText} />
                            <Text style={{ color: Colors.RoundBtnText }}>Previous</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: Colors.RoundBtnText }}>Next</Text>
                            <AntDesign name="right" size={20} color={Colors.RoundBtnText} />
                        </View>
                    </View>


                </>
            }


        </View >
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