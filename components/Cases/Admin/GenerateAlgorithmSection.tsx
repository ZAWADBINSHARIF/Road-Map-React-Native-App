// external import
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Dialog, Text, Menu, Button, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import RadioButton from '@/components/RadioButton/RadioButton';
import SettingModal from './SettingModal/SettingModal';



const GenerateAlgorithmSection = () => {


    const [menuVisible, setMenuVisible] = useState(false);
    const [nameDialogVisible, setNameDialogVisible] = useState(false);
    const [frequencyDialogVisible, setFrequencyDialogVisible] = useState(false);
    const [severityDialogVisible, setSeverityDialogVisible] = useState(false);
    const [dateTimeShow, setDateTimeShow] = useState(false);
    const [openDateTimeModal, setOpenDateTimeModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);
    const [showInfoInput, setShowInfoInput] = useState(false);
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [showImpression, setShowImpression] = useState(false);
    const [showResultBtn, setShowResultBtn] = useState(false);

    const [dateTimeModalMode, setDateTimeModalMode] = useState<'date' | 'time'>('date');
    const [videoFile, setVideoFile] = useState("");

    const [startTime, setStartTime] = useState(new Date());
    const [finishTime, setFinishTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [state_of_picker, set_state_of_picker] = useState<'Start Time' | 'Finish Time' | 'Date'>('Date');
    const [frequency, setFrequency] = useState<'Hour' | 'Day' | 'Week' | 'Month' | 'Year'>('Hour');

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const showDialog = () => {
        setNameDialogVisible(true);
        setMenuVisible(false);
    };

    const hideDialog = () => {
        setNameDialogVisible(false);
        setFrequencyDialogVisible(false);
        setSeverityDialogVisible(false);
    };

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



    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setVideoFile(result?.assets[0]?.uri);
        }
    };



    return (
        <View style={styles.generateAlgorithmSection}>

            <View style={{ flexDirection: 'row', gap: 10 }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ gap: 10, flex: 1 }}>

                        {showInfoInput &&
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
                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ gap: 10, flex: 1, }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                                    <Text style={{ paddingLeft: 5 }}>4.</Text>
                                    <AntDesign name="upsquare" size={20} color={Colors.focusBackground} />
                                </View>
                                <View style={{ flexDirection: showInfoInput ? 'row' : 'row-reverse', justifyContent: 'space-between', gap: 10 }}>
                                    {showInfoInput &&
                                        <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} />
                                    }

                                    <MaterialCommunityIcons name="video-vintage" size={20} color={Colors.focusBackground} onPress={pickVideo} />
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
                                title={'Diversion'}
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
                            <RadioButton
                                title={'Save'}
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
                    <TouchableOpacity onPress={() => setFrequencyDialogVisible(true)}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>Frequency</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSeverityDialogVisible(true)}>
                        <View style={[styles.roundBtn, { backgroundColor: Colors.focusBackground }]}>
                            <Text style={{ color: "white" }}>Severity</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            }

            <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>

                {showResultBtn &&
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity>
                            <View style={styles.ResultBtn}>
                                <Text style={{ color: 'white' }}>Results</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ flex: 1, gap: 10, flexDirection: 'row' }}>

                    <View style={{ flex: 1, gap: 10 }}>

                        {showNoteInput &&
                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                                placeholder='Note'
                            />
                        }

                        {showImpression &&
                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                                placeholder='Impression'
                            />
                        }
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
                    <Dialog visible={nameDialogVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Name</Dialog.Title>
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

                <Portal>
                    <Dialog visible={frequencyDialogVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Frequency</Dialog.Title>
                        <Dialog.Content>
                            <View>

                                <TextInput
                                    style={defaultStyles.defaultInputField}
                                    placeholder='Frequency'
                                    keyboardType='numeric'
                                />
                                <Picker
                                    selectedValue={frequency}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setFrequency(itemValue)
                                    }>
                                    <Picker.Item label="Hour" value="Hour" />
                                    <Picker.Item label="Day" value="Day" />
                                    <Picker.Item label="Week" value="Week" />
                                    <Picker.Item label="Month" value="Month" />
                                    <Picker.Item label="Year" value="Year" />
                                </Picker>

                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>
                                <Text style={{ color: Colors.SecondBackground }}>Done</Text>
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Portal>
                    <Dialog visible={severityDialogVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Severity</Dialog.Title>
                        <Dialog.Content>
                            <View>

                                <TextInput
                                    style={defaultStyles.defaultInputField}
                                    placeholder='Severity'
                                />

                            </View>
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
                    showInfoInput={showInfoInput}
                    setShowInfoInput={setShowInfoInput}
                    showNoteInput={showNoteInput}
                    setShowNoteInput={setShowNoteInput}
                    showImpression={showImpression}
                    setShowImpression={setShowImpression}
                    showResultBtn={showResultBtn}
                    setShowResultBtn={setShowResultBtn}
                />


            </View>

        </View >
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