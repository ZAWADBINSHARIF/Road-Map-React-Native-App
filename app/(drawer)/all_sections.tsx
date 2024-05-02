import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Button, Dialog, FAB, Modal, Portal } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const All_Sections = () => {

    const [openAddNewSectionModal, setOpenAddNewSectionModal] = useState(false);

    const hideDialog = () => {
        setOpenAddNewSectionModal(false);
    };

    const handleAddNewSection = () => {
        setOpenAddNewSectionModal(true);
    };


    return (
        <View style={styles.mainContainer}>
            <Text>All_Sections</Text>
            <FAB
                icon="plus"
                style={styles.fab_icon}
                onPress={handleAddNewSection}
                label='Add Section'
            />

            <View>

                <Portal>

                    <Dialog visible={openAddNewSectionModal} onDismiss={hideDialog} style={{ backgroundColor: "white", }}>
                        <Dialog.Title>Add New Section</Dialog.Title>
                        <Dialog.Content>
                            <View style={{ paddingTop: 18 }}>
                                <TextInput
                                    placeholder='Section Name'
                                    style={defaultStyles.inputField} />
                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>

                </Portal>

            </View>


        </View>
    );
};

export default All_Sections;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 12
    },
    fab_icon: {
        position: 'absolute',
        margin: 16,
        right: 16,
        bottom: 16,
        backgroundColor: Colors.CommonBackground
    }
});