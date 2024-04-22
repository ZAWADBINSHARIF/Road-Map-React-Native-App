// external import
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Dialog, Text, Menu, Button, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';


// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import RadioButton from '@/components/RadioButton/RadioButton';
import SettingModal from './SettingModal/SettingModal';



const GenerateAlgorithmSection = () => {


    const [menuVisible, setMenuVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dateTimeShow, setDateTimeShow] = useState(false);
    const [openDateTimeModal, setOpenDateTimeModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(true);

    const [dateTimeModalMode, setDateTimeModalMode] = useState<'date' | 'time'>('date');

    const [startTime, setStartTime] = useState(new Date());
    const [finishTime, setFinishTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [state_of_picker, set_state_of_picker] = useState<'Start Time' | 'Finish Time' | 'Date'>('Date');

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const showDialog = () => {
        setDialogVisible(true);
        setMenuVisible(false);
    };

    const hideDialog = () => setDialogVisible(false);

    const handleOnChangeDateTime = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setOpenDateTimeModal(Platform.OS === 'ios');

        if (state_of_picker === 'Date')
            setDate(currentDate);
        else if (state_of_picker === 'Start Time')
            setStartTime(currentDate);
        else if (state_of_picker === 'Finish Time')
            setFinishTime(currentDate);
    };

    const showDateTimeModal = (mode: 'date' | 'time', state: 'Start Time' | 'Finish Time' | 'Date' = 'Date') => {
        setOpenDateTimeModal(true);
        setDateTimeModalMode(mode);
        set_state_of_picker(state);
    };

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
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 4 }]}
                                placeholder='Info'
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ gap: 10, flex: 1, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                                    <Text style={{ paddingLeft: 5 }}>4.</Text>
                                    <AntDesign name="upsquare" size={20} color={Colors.focusBackground} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                                    <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} />
                                    <MaterialIcons name="attach-file" size={16} color={Colors.focusBackground} />
                                </View>

                            </View>

                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 4, height: "100%" }]}
                                placeholder='Question'
                            />

                        </View>
                    </View>

                    <View style={{ justifyContent: 'flex-end', paddingBottom: 10 }}>

                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={<Entypo name="dots-three-vertical" size={24} color={Colors.SecondBackground} onPress={openMenu} />}
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderRadius: 12
                            }}
                        >
                            <RadioButton
                                title={'Problem List'}
                            />
                            <RadioButton
                                title={'Setting'}
                                onChangeValue={() => {
                                    setOpenSettingModal(true);
                                    setMenuVisible(false);
                                }}
                            />
                            <RadioButton
                                title={'String Header'}
                            />
                            <RadioButton
                                title={'Link'}
                            />
                            <RadioButton
                                title={'Date/Time'}
                                value={dateTimeShow}
                                onChangeValue={() => setDateTimeShow(!dateTimeShow)}
                            />
                            <RadioButton
                                title={'Name'}
                                onChangeValue={showDialog}
                            />
                        </Menu>

                    </View>

                </View>
            </View>

            {dateTimeShow &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>

                    <TouchableOpacity onPress={() => showDateTimeModal('date')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDateTimeModal('time', 'Start Time')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{startTime.getHours()}h:{startTime.getMinutes()}m</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDateTimeModal('time', 'Finish Time')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{finishTime.getHours()}h:{finishTime.getMinutes()}m</Text>
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
            }

            <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>

                <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity>
                        <View style={styles.ResultBtn}>
                            <Text style={{ color: 'white' }}>Results</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, gap: 10, flexDirection: 'row' }}>

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

                    <View style={{ width: 11 }} />

                </View>

            </View>

            {/* // ** All type of Modals and Dialogs */}
            <View>

                {
                    openDateTimeModal &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={dateTimeModalMode}
                        is24Hour={false}
                        onChange={handleOnChangeDateTime}
                        display="default"
                    />
                }


                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                style={defaultStyles.defaultInputField}
                                placeholder='Name' />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>
                                <Text style={{ color: Colors.SecondBackground }}>Done</Text>
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                {/* // Setting Modal  */}
                <SettingModal
                    visible={openSettingModal}
                    setVisible={setOpenSettingModal}
                />


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