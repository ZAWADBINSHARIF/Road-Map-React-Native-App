// external import
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


// internal import
import { defaultStyles } from '@/constants/Styles';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Checkbox, Menu } from 'react-native-paper';



const GenerateAlgorithmSection = () => {


    const [visible, setVisible] = useState(false);
    const [dateTimeShow, setDateTimeShow] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);


    return (
        <View style={styles.generateAlgorithmSection}>

            <View style={{ flexDirection: 'row', gap: 10 }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ gap: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                                <Fontisto name="save" size={15} color={Colors.focusBackground} />
                            </View>

                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 6 }]}
                                placeholder='Info'
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ gap: 10, flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                                    <Text>4.</Text>
                                    <AntDesign name="upsquare" size={20} color={Colors.focusBackground} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                                    <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} />
                                    <MaterialIcons name="attach-file" size={16} color={Colors.focusBackground} />
                                </View>

                            </View>

                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 6, height: "100%" }]}
                                placeholder='Question'
                            />

                        </View>
                    </View>

                    <View style={{ justifyContent: 'flex-end', paddingBottom: 10 }}>

                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Entypo name="dots-three-vertical" size={24} color={Colors.SecondBackground} onPress={openMenu} />}>
                            <Menu.Item onPress={() => { }} title="Problem List" />
                            <Menu.Item onPress={() => { }} title="Setting" />
                            <Menu.Item onPress={() => { }} title="String Header" />
                            <Menu.Item onPress={() => { }} title="Link" />
                            <Checkbox.Item label='Date/Time' status={dateTimeShow ? 'checked' : 'unchecked'} onPress={() => setDateTimeShow(!dateTimeShow)} />
                            <Menu.Item onPress={() => { }} title="Name" />
                        </Menu>

                    </View>

                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                {dateTimeShow &&
                    <>
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
                    </>
                }
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
                        placeholder='Note'
                    />
                    <TextInput
                        multiline={true}
                        style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                        placeholder='Impression'
                    />
                </View>

            </View>

        </View>
    );
};

export default GenerateAlgorithmSection;


const styles = StyleSheet.create({
    generateAlgorithmSection: {
        paddingVertical: 0
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