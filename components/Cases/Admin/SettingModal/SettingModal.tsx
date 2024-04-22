import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';


import Colors from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { defaultStyles } from '@/constants/Styles';


interface Props {
    visible: boolean,
    setVisible: (value: React.SetStateAction<boolean>) => void;
}


const SettingModal = ({ visible, setVisible }: Props) => {
    return (
        <Portal>
            <Modal visible={visible} dismissableBackButton={true} onDismiss={() => setVisible(false)} contentContainerStyle={styles.ModalContainer}>

                {/* // ** Header section  */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Setting Box</Text>
                    </View>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', borderRadius: 25 }}
                        onPress={() => setVisible(false)}>
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* // ** Header End  */}


                <View style={{ paddingTop: 10, gap: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <Text>Tag Admin</Text>
                        <View style={{
                            backgroundColor: 'white',
                            marginLeft: 10,
                            padding: 5,
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: "45%",
                            paddingHorizontal: 10,
                        }}>
                            <Text>Type</Text>
                            <TouchableOpacity style={{ borderRadius: 10, overflow: 'hidden' }}>
                                <AntDesign name="plussquare" size={24} color={Colors.focusBackground} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <Text>Dropdowns Users</Text>
                        <View style={{
                            backgroundColor: 'white',
                            marginLeft: 10,
                            padding: 5,
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: "45%",
                            paddingHorizontal: 10,
                        }}>
                            <Text>Type</Text>
                            <TouchableOpacity style={{ borderRadius: 10, overflow: 'hidden' }}>
                                <AntDesign name="plussquare" size={24} color={Colors.focusBackground} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Text>Add Info</Text>
                            <Ionicons name="information-circle-outline" size={20} color={Colors.focusBackground} />
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Add Note</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Create next page</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Blink effect</Text>
                            <Text>Box</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                            <Text>Charter</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Populate</Text>
                            <Text>List</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                            <Text>Dots</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                            <Text>ABC</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Impression</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="dot-single" size={24} color="black" />
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text>Result</Text>
                            <Checkbox style={[defaultStyles.checkBox, { backgroundColor: 'white' }]} value={false} />
                        </View>
                    </View>

                </View>


            </Modal>
        </Portal>

    );
};

export default SettingModal;

const styles = StyleSheet.create({
    ModalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: Colors.CommonBackground,
        marginHorizontal: '5%',
        // height: "75%",
        padding: 16,
        borderRadius: 8
    }
});