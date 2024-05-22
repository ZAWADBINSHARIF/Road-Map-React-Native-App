// external import
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, Divider, Modal, Portal } from 'react-native-paper';


// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';


interface Props {
    visible: boolean,
    closeModal: () => void;
    ListData: String[],
    impression: String[],
    setImpression: React.Dispatch<React.SetStateAction<String[]>>;
}



const ImpressionSelectMenu = ({ visible, closeModal, ListData, impression, setImpression }: Props) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => closeModal()}
                contentContainerStyle={styles.ModalContainer}
            >

                <View style={{ paddingBottom: 7 }}>
                    <Text style={{ fontSize: 18 }}>Choose your impression:</Text>
                </View>

                <View style={{ paddingVertical: 12, gap: 8 }}>

                    {ListData?.map((item, index) => (

                        <View key={index} style={{ flexDirection: 'row', gap: 6, paddingBottom: 6, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }}>
                            <Text style={{ flex: 1 }}>{item}</Text>
                            {
                                impression.find(data => item === data) ?
                                    <TouchableOpacity onPress={() => setImpression(prev => prev.filter(data => data != item))}>
                                        <AntDesign name="minuscircleo" size={20} color="black" />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setImpression(prev => [...prev, item])}>
                                        <AntDesign name="pluscircleo" size={20} color="black" />
                                    </TouchableOpacity>
                            }

                        </View>

                    ))}

                    {ListData?.length <= 0 &&
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No Data</Text>
                        </View>
                    }

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