import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';



interface Props {
    visible: boolean,
    setVisible: (value: React.SetStateAction<boolean>) => void,
    mediaFiles?: {
        uri: string,
        type: string,
        name: string;
    }[];
}


const MediaPreviewModal = ({
    visible,
    setVisible,
    mediaFiles
}: Props) => {

    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.ModalContainer}>
                <Image
                    source={{ uri: mediaFiles[0]?.uri }}
                    contentFit="cover"
                    style={{ width: "100%", height: "100%" }}
                />
            </Modal>
        </Portal>
    );
};

export default MediaPreviewModal;


const styles = StyleSheet.create({
    ModalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        padding: 16,
        borderRadius: 8,
        height: '50%'
    }
});