// external import
import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Button, Divider, Modal, Portal } from 'react-native-paper';


// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';


interface Props {
    visible: boolean,
    closeModal: () => void;
    ListData?: String[],
}



const ImpressionSelectMenu = ({ visible, closeModal, ListData }: Props) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => closeModal()}
                contentContainerStyle={styles.ModalContainer}
            >

                <View>
                    <Text style={{ paddingBottom: 15 }}>Hello this is Impressing</Text>
                    <Divider />
                </View>


            </Modal>
        </Portal>
    );
};

export default ImpressionSelectMenu;


const styles = StyleSheet.create({
    ModalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: "white",
        marginHorizontal: '5%',
        padding: 16,
        borderRadius: 8,
        height: "45%"
    }
});