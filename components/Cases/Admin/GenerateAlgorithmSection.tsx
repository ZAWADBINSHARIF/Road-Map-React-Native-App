// external import
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Dialog, Text, Menu, Button, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Crypto from 'expo-crypto';
import Toast from 'react-native-simple-toast';
import * as Haptics from 'expo-haptics';


// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import RadioButton from '@/components/RadioButton/RadioButton';
import SettingModal from './Modals/SettingModal/SettingModal';
import SelectBranchFromMenu from './SelectBranchFromMenu';
import AddItemListMenu from './AddItemListMenu';
import ImpressionSelectMenu from './ImpressionSelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCase } from '@/store/slices/savedCaseSlice';
import { StoreState } from '@/store';
import { setCaseContainerName } from '@/store/slices/commonPropertySlice';
import MediaPreviewModal from './Modals/MediaPreviewModal/MediaPreviewModal';
import useFileExtension from '@/hooks/useFileExtension';



const GenerateAlgorithmSection = () => {

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const [nameDialogVisible, setNameDialogVisible] = useState<boolean>(false);
    const [frequencyDialogVisible, setFrequencyDialogVisible] = useState<boolean>(false);
    const [severityDialogVisible, setSeverityDialogVisible] = useState<boolean>(false);
    const [ImpressionSelectMenuVisible, setImpressionSelectMenuVisible] = useState<boolean>(false);
    const [infoPreviewDialogVisible, setInfoPreviewDialogVisible] = useState<boolean>(false);
    const [dateTimeShow, setDateTimeShow] = useState<boolean>(false);
    const [openDateTimeModal, setOpenDateTimeModal] = useState<boolean>(false);
    const [openSettingModal, setOpenSettingModal] = useState<boolean>(false);
    const [showInfoInput, setShowInfoInput] = useState<boolean>(false);
    const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
    const [showImpression, setShowImpression] = useState<boolean>(false);
    const [showResultBtn, setShowResultBtn] = useState<boolean>(false);
    const [BranchModalVisible, setBranchModalVisible] = useState<boolean>(false);
    const [AddItemListMenuVisible, setAddItemListMenuVisible] = useState<boolean>(false);
    const [AddItemListMenuName, setAddItemListMenuName] = useState<'Problem List' | 'Dropdowns Users'>('Problem List');
    const savedCasesLength: number = useSelector((state: StoreState): number => state?.savedCase.length as number);
    const [mediaPreviewModalVisible, setMediaPreviewModalVisible] = useState<boolean>(false);
    // const caseContainerEditMode: boolean = useSelector((state: StoreState) => state.commonProperty.caseContainerEditMode);

    const [dateTimeModalMode, setDateTimeModalMode] = useState<'date' | 'time'>('date');

    const [state_of_picker, set_state_of_picker] = useState<'Start Time' | 'Finish Time' | 'Date'>('Date');
    const [frequencyTime, setFrequencyTime] = useState<'Hour' | 'Day' | 'Week' | 'Month' | 'Year'>('Hour');


    // ** Generate Algorithm Section admin import values

    const [date, setDate] = useState<Date>(new Date());
    const [information, setInformation] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [impression, setImpression] = useState<String[]>([]);
    const caseLocation = useSelector((state: StoreState) => state.commonProperty.caseLocation);
    const [mediaFiles, setMediaFiles] = useState<{
        uri: string,
        type: string,
        name: string;
    }[]>([]);
    const name = useSelector((state: StoreState) => state.commonProperty.caseContainerName);
    const [frequency, setFrequency] = useState<{
        number: Number,
        time: 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';
    }>({
        number: 0,
        time: frequencyTime
    });
    const [severity, setSeverity] = useState<string>();
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [finishTime, setFinishTime] = useState<Date>(new Date());
    const [dropdowns_users, setDropdowns_users] = useState<String[]>([]);
    const pageNo: number = useSelector((state: StoreState) => state.commonProperty.pageNo);

    //  ** ==========================================================================


    const dispatch = useDispatch();
    const problemList = useSelector((state: StoreState) => state?.commonProperty.problemList);

    const openMenu = () => setMenuVisible(true);
    const openBranchModal = () => setBranchModalVisible(true);

    const closeMenu = () => {
        setMenuVisible(false);
        setBranchModalVisible(false);
        setAddItemListMenuVisible(false);
        setImpressionSelectMenuVisible(false);
        setMediaPreviewModalVisible(false);
    };

    const showDialog = () => {
        setNameDialogVisible(true);
        setMenuVisible(false);
    };

    const hideDialog = () => {
        setNameDialogVisible(false);
        setFrequencyDialogVisible(false);
        setSeverityDialogVisible(false);
        setInfoPreviewDialogVisible(false);
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


    const onSaveInfo = () => {
        if (!information)
            return;

        setShowInfoInput(false);
    };

    const videoImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 2,
            videoMaxDuration: 120,
        });

        if (!result.canceled) {

            setMediaFiles([]);


            for (let index in result?.assets) {

                const { uri, mimeType, fileName } = result?.assets[index];

                const ext = useFileExtension(uri);

                if (!ext) {
                    return;
                }

                setMediaFiles((prev: any) => {
                    prev[index] = {
                        uri,
                        type: mimeType as string,
                        name: fileName as string
                    };
                    return prev;
                });
            }

        }
    };


    const previewUploadedImage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setMediaPreviewModalVisible(true);
    };


    const handleSaveCase = () => {

        if (!question || !caseLocation || !name) {
            Toast.show("Fill the Question input, set case location and set the case name", Toast.LONG);
            return;
        }

        const id = Crypto.randomUUID();
        console.log(pageNo);

        if (!dateTimeShow) {
            dispatch(addNewCase({
                id,
                information: !showInfoInput ? information : '',
                question,
                note,
                impression,
                caseLocation,
                mediaFiles,
                dropdowns_users,
                pageNo
            }));
        } else {
            dispatch(addNewCase({
                id,
                date: date.toISOString(),
                information: !showInfoInput ? information : '',
                question,
                note,
                impression,
                caseLocation,
                mediaFiles,
                frequency,
                severity,
                startTime: startTime.toISOString(),
                finishTime: finishTime.toISOString(),
                dropdowns_users,
                pageNo
            }));
        }


        console.log({
            id,
            date,
            information,
            question,
            note,
            impression,
            caseLocation,
            mediaFiles,
            name,
            frequency,
            severity,
            startTime: startTime.toISOString(),
            finishTime: finishTime.toISOString(),
            dropdowns_users,
            pageNo
        });


        setStartTime(new Date());
        setFinishTime(new Date());
        setDate(new Date());
        setFrequency({ number: 0, time: 'Hour' });
        setInformation("");
        setQuestion("");
        setNote("");
        setImpression([]);
        setMediaFiles([]);
        setSeverity("");
        setDropdowns_users([]);
        setStartTime(new Date());
        setFinishTime(new Date());
        setDate(new Date());
        setFrequency({
            number: 0,
            time: frequencyTime
        });

        closeMenu();
        hideDialog();

    };

    return (
        <View style={styles.generateAlgorithmSection}>

            <View style={{ flexDirection: 'row', gap: 10 }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ gap: 10, flex: 1 }}>

                        {showInfoInput &&
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
                                    onPress={onSaveInfo}
                                >
                                    <Fontisto name="save" size={15} color={Colors.focusBackground} />
                                </TouchableOpacity>

                                <TextInput
                                    multiline={true}
                                    style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 4 }]}
                                    placeholder='Info'
                                    value={information}
                                    onChangeText={setInformation}
                                />
                            </View>
                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ gap: 10, flex: 1, }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                                    <Text style={{ paddingLeft: 5 }}>{savedCasesLength + 1}.</Text>
                                    <AntDesign name="upsquare" size={20} color={Colors.focusBackground} onPress={openBranchModal} />
                                </View>
                                <View style={{ flexDirection: (!showInfoInput && information) ? 'row' : 'row-reverse', justifyContent: 'space-between', gap: 10 }}>
                                    {(!showInfoInput && information) &&
                                        <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} onPress={() => setInfoPreviewDialogVisible(true)} />
                                    }

                                    <MaterialCommunityIcons name="video-vintage" size={20} color={Colors.focusBackground}
                                        onPress={videoImagePicker}
                                        onLongPress={previewUploadedImage} />
                                </View>

                            </View>

                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 4, height: "100%" }]}
                                placeholder='Question'
                                value={question}
                                onChangeText={setQuestion}
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
                                onChangeValue={() => {
                                    setAddItemListMenuVisible(true);
                                    setMenuVisible(false);
                                    setAddItemListMenuName('Problem List');
                                }}
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
                                onChangeValue={handleSaveCase}
                            />
                        </Menu>

                    </View>

                </View>
            </View>

            {dateTimeShow &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>

                    <TouchableOpacity onPress={() => showDateTimeModal('date')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{date?.getDate()}/{date?.getMonth() as number + 1}/{date?.getFullYear()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDateTimeModal('time', 'Start Time')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{startTime?.getHours()}h:{startTime?.getMinutes()}m</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDateTimeModal('time', 'Finish Time')}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{finishTime?.getHours()}h:{finishTime?.getMinutes()}m</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFrequencyDialogVisible(true)}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{frequency.number == 0 ? 'Frequency' : `${frequency.number}/${frequency.time}`}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSeverityDialogVisible(true)}>
                        <View style={[styles.roundBtn, { backgroundColor: Colors.focusBackground }]}>
                            <Text style={{ color: "white" }}>{severity ? severity : 'Severity'}</Text>
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
                                value={note}
                                onChangeText={setNote}
                            />
                        }

                        {showImpression &&
                            <TouchableOpacity
                                style={[defaultStyles.defaultInputField, { height: hp(5), flexDirection: 'row', alignItems: 'center' }]}
                                onPress={() => setImpressionSelectMenuVisible(true)}
                            >
                                <Text style={{ flex: 1, color: Colors.SecondBackground }}>Impression</Text>
                                <AntDesign name="arrowright" size={24} color={Colors.SecondBackground} />
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={{ width: 11 }} />

                </View>

            </View>

            {/* // ** All type of Modals and Dialogs */}
            <View>

                <MediaPreviewModal
                    visible={mediaPreviewModalVisible}
                    setVisible={setMediaPreviewModalVisible}
                    mediaFiles={mediaFiles}
                />

                <AddItemListMenu
                    visible={AddItemListMenuVisible}
                    closeModal={closeMenu}
                    AddItemListMenuName={AddItemListMenuName}
                    ListData={AddItemListMenuName === 'Problem List' ? problemList :
                        AddItemListMenuName === 'Dropdowns Users' ? dropdowns_users : []}
                    setDropdowns_users={setDropdowns_users}
                />

                <SelectBranchFromMenu visible={BranchModalVisible} closeModal={setBranchModalVisible} />

                <ImpressionSelectMenu
                    visible={ImpressionSelectMenuVisible}
                    closeModal={closeMenu}
                    ListData={problemList}
                    impression={impression}
                    setImpression={setImpression}
                />

                <Portal>
                    <Dialog visible={infoPreviewDialogVisible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{information}</Text>
                        </Dialog.Content>
                    </Dialog>
                </Portal>

                {
                    openDateTimeModal &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date!}
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
                                placeholder='Name'
                                value={name}
                                onChangeText={(e) => dispatch(setCaseContainerName(e))}
                            />
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
                                    value={frequency?.number.toString()}
                                    onChangeText={(e) => setFrequency({ time: frequencyTime, number: parseInt(e) | 0 })}
                                />
                                <Picker
                                    selectedValue={frequencyTime}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setFrequencyTime(itemValue)
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
                                    value={severity}
                                    onChangeText={setSeverity}
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
                    setAddItemListMenuVisible={setAddItemListMenuVisible}
                    setAddItemListMenuName={setAddItemListMenuName}
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