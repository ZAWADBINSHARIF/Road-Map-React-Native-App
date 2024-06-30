// external import
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dialog, Text, Menu, Button, Portal, Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Entypo, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import { removeCase, updateCase } from '@/store/slices/savedCaseSlice';
import { StoreState } from '@/store';
import { setCaseContainerName } from '@/store/slices/commonPropertySlice';
import MediaPreviewModal from './Modals/MediaPreviewModal/MediaPreviewModal';

interface SavedCase {
    _id?: string;
    id: string,
    index: number,
    information?: string,
    question: string,
    date?: Date,
    note?: string,
    impression?: String[],
    mediaFiles?: {
        uri: string,
        type: string,
        name: string;
    }[],
    case_files_name?: string[];
    name?: string,
    frequency?: {
        number: Number;
        time: "Hour" | "Day" | "Week" | "Month" | "Year";
    } | undefined,
    severity?: string,
    startTime?: string,
    finishTime?: string,
    dropdowns_users?: String[];
}


const SavedCaseComponent = (props: SavedCase) => {

    const [editable, setEditable] = useState<boolean>(false);
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
    const [mediaPreviewModalVisible, setMediaPreviewModalVisible] = useState<boolean>(false);


    const [dateTimeModalMode, setDateTimeModalMode] = useState<'date' | 'time'>('date');

    const [state_of_picker, set_state_of_picker] = useState<'Start Time' | 'Finish Time' | 'Date'>('Date');
    const [frequencyTime, setFrequencyTime] = useState<'Hour' | 'Day' | 'Week' | 'Month' | 'Year'>('Hour');


    // ** Generate Algorithm Section admin import values

    const [date, setDate] = useState<Date>(props.date ? new Date(props?.date) : new Date());
    const [information, setInformation] = useState<string | undefined>(props.information);
    const [question, setQuestion] = useState<string>(props.question);
    const [note, setNote] = useState<string | undefined>(props.note);
    const [impression, setImpression] = useState<String[]>(props.impression || []);
    const caseLocation = useSelector((state: StoreState) => state.commonProperty.caseLocation);
    const [mediaFiles, setMediaFiles] = useState<{
        uri: string,
        type: string,
        name: string;
    }[] | undefined>(props?.mediaFiles);
    const name = useSelector((state: StoreState) => state.commonProperty.caseContainerName);
    const [frequency, setFrequency] = useState<{
        number: Number,
        time: 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';
    } | undefined>(props.frequency);
    const [severity, setSeverity] = useState<string | undefined>(props.severity);
    const [startTime, setStartTime] = useState<Date>(props.startTime ? new Date(props.startTime) : new Date());
    const [finishTime, setFinishTime] = useState<Date>(props.finishTime ? new Date(props.finishTime) : new Date());
    const [dropdowns_users, setDropdowns_users] = useState<String[]>(props.dropdowns_users || []);

    //  ** ==========================================================================


    const dispatch = useDispatch();
    const problemList = useSelector((state: StoreState) => state?.commonProperty.problemList);

    const openMenu = () => setMenuVisible(true);

    const openBranchModal = () => {
        if (!editable)
            return;
        setBranchModalVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setBranchModalVisible(false);
        setAddItemListMenuVisible(false);
        setImpressionSelectMenuVisible(false);
        setMediaPreviewModalVisible(false);
    };

    const showDialog = () => {


        if (!editable)
            return;


        setNameDialogVisible(true);
        setMenuVisible(false);
    };

    const hideDialog = () => {

        setInfoPreviewDialogVisible(false);

        if (!editable)
            return;

        setNameDialogVisible(false);
        setFrequencyDialogVisible(false);
        setSeverityDialogVisible(false);
    };

    const handleOnChangeDateTime = (event: any, selectedDate: any) => {

        if (!editable)
            return;

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

        if (!editable)
            return;

        setOpenDateTimeModal(true);
        setDateTimeModalMode(mode);
        set_state_of_picker(state);
    };


    const onSaveInfo = () => {

        if (!information && !editable)
            return;

        setShowInfoInput(false);
    };

    const pickVideo = async () => {

        if (!editable)
            return;

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


        if (!question && !caseLocation) {
            Toast.show("Fill the Question input and set case location", Toast.LONG);
            return;
        }

        if (caseLocation === null) {
            Toast.show("Set case location", Toast.LONG);
            return;
        }

        if (!dateTimeShow) {
            dispatch(updateCase({
                id: props.id,
                information: showInfoInput ? information : '',
                question,
                note,
                impression,
                caseLocation,
                mediaFiles,
                dropdowns_users
            }));
        } else {
            dispatch(updateCase({
                id: props.id,
                information: showInfoInput ? information : '',
                question,
                note,
                impression,
                caseLocation,
                mediaFiles,
                frequency,
                severity,
                date: date.toISOString(),
                startTime: startTime.toISOString(),
                finishTime: finishTime.toISOString(),
                dropdowns_users
            }));
        }


        console.log({
            id: props.id,
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
            startTime,
            finishTime,
            dropdowns_users
        });

        setEditable(false);
        closeMenu();
    };

    const handleRemoveCase = () => {
        dispatch(removeCase({ id: props.id }));
        closeMenu();
    };

    useEffect(() => {

        if ((frequency || severity) &&
            date &&
            startTime &&
            finishTime) {
            setDateTimeShow(true);
        }

    }, []);

    return (
        <View style={styles.SavedCaseComponent}>

            <View style={{ flexDirection: 'row', gap: 10 }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ gap: 10, flex: 1 }}>

                        {showInfoInput && editable &&
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
                                    editable={editable}
                                />
                            </View>
                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                            <View style={{ gap: 10, flex: 1, }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                                    <Text style={{ paddingLeft: 5 }}>{props.index + 1}.</Text>
                                    <AntDesign name="upsquare" size={20} color={Colors.focusBackground} onPress={openBranchModal} />
                                </View>
                                <View style={{ flexDirection: (!showInfoInput && information) ? 'row' : 'row-reverse', justifyContent: 'space-between', gap: 10 }}>
                                    {(!showInfoInput && information) &&
                                        <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} onPress={() => setInfoPreviewDialogVisible(true)} />
                                    }
                                    <View>
                                        {mediaFiles && mediaFiles?.length > 0 &&
                                            <Badge
                                                size={14}
                                                style={{ position: 'absolute', top: -5, right: -5, zIndex: 1 }}
                                            >
                                                {mediaFiles?.length || 0}
                                            </Badge>
                                        }
                                        <MaterialCommunityIcons name="video-vintage" size={20}
                                            color={(mediaFiles && mediaFiles?.length > 0) ? Colors.focusBackground : 'gray'}
                                            onPress={pickVideo}
                                            onLongPress={previewUploadedImage} />
                                    </View>
                                </View>

                            </View>

                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100, flex: 4, height: "100%" }]}
                                placeholder='Question'
                                value={question}
                                onChangeText={setQuestion}
                                editable={editable}
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
                                title={'Edit'}
                                value={editable}
                                onChangeValue={() => setEditable(!editable)}
                            />
                            <RadioButton
                                title={'Remove'}
                                onChangeValue={handleRemoveCase}
                            />
                            {editable &&
                                <RadioButton
                                    title={'Problem List'}
                                    onChangeValue={() => {
                                        setAddItemListMenuVisible(true);
                                        setMenuVisible(false);
                                        setAddItemListMenuName('Problem List');
                                    }}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Setting'}
                                    onChangeValue={() => {
                                        setOpenSettingModal(true);
                                        setMenuVisible(false);
                                    }}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Diversion'}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Link'}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Date/Time'}
                                    value={dateTimeShow}
                                    onChangeValue={() => setDateTimeShow(!dateTimeShow)}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Name'}
                                    onChangeValue={showDialog}
                                />}
                            {editable &&
                                <RadioButton
                                    title={'Save'}
                                    onChangeValue={handleSaveCase}
                                />}
                        </Menu>

                    </View>

                </View>
            </View>

            {dateTimeShow &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>

                    <TouchableOpacity onPress={() => {
                        if (!editable) {
                            return;
                        }
                        showDateTimeModal('date');
                    }}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{date?.getDate()}/{date?.getMonth() as number + 1}/{date?.getFullYear()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!editable) {
                            return;
                        }
                        showDateTimeModal('time', 'Start Time');
                    }}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{startTime?.getHours()}h:{startTime?.getMinutes()}m</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!editable) {
                            return;
                        }
                        showDateTimeModal('time', 'Finish Time');
                    }}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>{finishTime?.getHours()}h:{finishTime?.getMinutes()}m</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!editable) {
                            return;
                        }
                        setFrequencyDialogVisible(true);
                    }}>
                        <View style={styles.roundBtn}>
                            <Text style={{ color: Colors.RoundBtnText }}>Frequency</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!editable) {
                            return;
                        }
                        setSeverityDialogVisible(true);
                    }}>
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

                        {(showNoteInput || note) &&
                            <TextInput
                                multiline={true}
                                style={[defaultStyles.defaultInputField, { maxHeight: 100 }]}
                                placeholder='Note'
                                value={note}
                                onChangeText={setNote}
                                editable={editable}
                            />
                        }

                        {(showImpression || impression.length > 0) &&
                            <TouchableOpacity
                                style={[defaultStyles.defaultInputField, { height: hp(5), flexDirection: 'row', alignItems: 'center' }]}
                                onPress={() => {
                                    if (!editable)
                                        return;
                                    setImpressionSelectMenuVisible(true);
                                }}
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

                {mediaFiles &&
                    <MediaPreviewModal
                        visible={mediaPreviewModalVisible}
                        setVisible={setMediaPreviewModalVisible}
                        mediaFiles={mediaFiles}
                    />
                }

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

export default SavedCaseComponent;


const styles = StyleSheet.create({
    SavedCaseComponent: {
        paddingVertical: 18,
        borderColor: Colors.SecondBackground,
        borderBottomWidth: StyleSheet.hairlineWidth,

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