import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { SetStateAction, useState } from 'react';
import { Button, Divider, Modal, Portal } from 'react-native-paper';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addProblem, removeProblem } from '@/store/slices/caseAddingCommonPropertySlice';


interface Props {
    visible: boolean,
    closeModal: () => void;
    ListData: String[],
    AddItemListMenuName: 'Problem List' | 'Dropdowns Users';
    setDropdowns_users: React.Dispatch<React.SetStateAction<String[]>>;
}


const AddItemListMenu = ({ visible, closeModal, ListData, AddItemListMenuName, setDropdowns_users }: Props) => {

    if (!AddItemListMenuName)
        return;


    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();

    const handleAddItem = () => {
        if (!inputValue)
            return;

        if (AddItemListMenuName === 'Problem List')
            dispatch(addProblem(inputValue));

        if (AddItemListMenuName === 'Dropdowns Users')
            setDropdowns_users(prev => [...prev, inputValue]);

        setInputValue('');
    };

    function handleRemoveItem(item: String) {
        if (AddItemListMenuName === 'Problem List')
            dispatch(removeProblem(item));

        if (AddItemListMenuName === 'Dropdowns Users')
            setDropdowns_users(prev => prev.filter(data => item !== data));
    };

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
                        placeholder='Type Name'
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Button
                        icon='plus'
                        mode='contained-tonal'
                        style={{ backgroundColor: Colors.CommonBackground }}
                        onPress={handleAddItem}
                    >
                        Add
                    </Button>
                </View>

                <Divider />

                <View style={{ paddingVertical: 12, gap: 8 }}>
                    {
                        AddItemListMenuName === 'Problem List' &&

                        ListData?.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', gap: 6, paddingBottom: 6, borderColor: '#80808089', borderBottomWidth: StyleSheet.hairlineWidth }}>
                                <Text style={{ flex: 1 }}>{item}</Text>
                                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                                    <Entypo name="circle-with-cross" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                    {
                        AddItemListMenuName === 'Dropdowns Users' &&

                        ListData?.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', gap: 6, paddingBottom: 6, borderColor: '#80808089', borderBottomWidth: StyleSheet.hairlineWidth }}>
                                <Text style={{ flex: 1 }}>{item}</Text>
                                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                                    <Entypo name="circle-with-cross" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>

            </Modal>
        </Portal >
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