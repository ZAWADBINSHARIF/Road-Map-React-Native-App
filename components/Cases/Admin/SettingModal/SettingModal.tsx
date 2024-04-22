import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { Entypo, Ionicons } from '@expo/vector-icons';


import Colors from '@/constants/Colors';


interface Props {
    visible: boolean,
    setVisible: (value: React.SetStateAction<boolean>) => void;
}


const SettingModal = ({ visible, setVisible }: Props) => {
    return (
        <Portal>
            <Modal visible={visible} dismissableBackButton={true} onDismiss={() => setVisible(false)} contentContainerStyle={styles.ModalContainer}>
                {/* // Header section  */}
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
                    <View>

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
        height: "75%",
        padding: 16,
        borderRadius: 8
    }
});