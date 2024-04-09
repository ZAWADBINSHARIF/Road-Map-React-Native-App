// external import
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';


// internal import
import { defaultStyles } from '@/constants/Styles';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';



const GenerateAlgorithmSection = () => {
    return (
        <View style={styles.generateAlgorithmSection}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ gap: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Fontisto name="save" size={15} color={Colors.focusBackground} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                        <Text>4.</Text>
                        <AntDesign name="upsquare" size={20} color={Colors.focusBackground} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                        <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} />
                        <MaterialIcons name="attach-file" size={16} color={Colors.focusBackground} />
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ gap: 10, flex: 1 }}>

                        <TextInput
                            multiline={true}
                            style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                            placeholder='Type'
                        />
                        <TextInput
                            multiline={true}
                            style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                            placeholder='Type'
                        />
                    </View>
                    <View style={{ justifyContent: 'flex-end', paddingBottom: 5 }}>
                        <TouchableOpacity>
                            <Entypo name="dots-three-vertical" size={24} color={Colors.SecondBackground} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                <TouchableOpacity>
                    <View style={styles.roundBtn}>
                        <Text style={{ color: Colors.RoundBtnText }}>00.00.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.roundBtn}>
                        <Text style={{ color: Colors.RoundBtnText }}>00.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.roundBtn}>
                        <Text style={{ color: Colors.RoundBtnText }}>00.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.roundBtn}>
                        <Text style={{ color: Colors.RoundBtnText }}>Frequency</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.roundBtn, { backgroundColor: Colors.focusBackground }]}>
                        <Text style={{ color: "white" }}>Severity</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>

                <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity>
                        <View style={styles.ResultBtn}>
                            <Text style={{ color: 'white' }}>Results</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, gap: 10 }}>
                    <TextInput
                        multiline={true}
                        style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                        placeholder='Type'
                    />
                    <TextInput
                        multiline={true}
                        style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                        placeholder='Type'
                    />
                </View>

            </View>

        </View>
    );
};

export default GenerateAlgorithmSection;


const styles = StyleSheet.create({
    generateAlgorithmSection: {
        paddingVertical: 10
    },
    roundBtn: {
        padding: 5,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.SecondBackground
    },
    ResultBtn: {
        backgroundColor: Colors.focusBackground,
        padding: 8,
        borderRadius: 5
    }
});