import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Button, Divider, Modal, Portal } from 'react-native-paper';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';


interface Props {
    visible: boolean,
    closeModal: () => void;
    ListData?: String[],
    AddItemListMenuName: 'Problem List' | 'Dropdowns Users';
}


const AddItemListMenu = ({ visible, closeModal, ListData, AddItemListMenuName }: Props) => {


    if (!AddItemListMenuName)
        return;

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => closeModal()}
                contentContainerStyle={styles.ModalContainer}
            >

                <View style={{ flexDirection: 'row', gap: 10, paddingBottom: 7 }}>
                    <TextInput
                        style={[defaultStyles.defaultInputField, { 'flex': 1 }]}
                        placeholder='Problem name'
                    />
                    <Button
                        icon='plus'
                        mode='contained-tonal'
                        style={{ backgroundColor: Colors.CommonBackground }}
                        onPress={() => console.log("Plus")}
                    >
                        Add
                    </Button>
                </View>

                <Divider />

                <View style={{ paddingVertical: 12 }}>

                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        <Text style={{ flex: 1 }}>Hello this is {AddItemListMenuName}</Text>
                        <Entypo name="circle-with-cross" size={20} color="black" onPress={() => console.log("Hello")} />
                    </View>


                </View>


            </Modal>
        </Portal>
    );
};

export default AddItemListMenu;


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