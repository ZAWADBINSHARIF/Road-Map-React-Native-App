import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { Image } from 'expo-image';
import { Swipeable } from 'react-native-gesture-handler';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';



interface Props {
    visible: boolean,
    setVisible: (value: React.SetStateAction<boolean>) => void,
    mediaFiles: {
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


    const video = React.useRef(null);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const firstFile = (mediaFiles as any)[0];
    const secondFile = (mediaFiles as any)[1];

    const VideoRender = ({ uri }: { uri: any; }) => (
        <Video
            ref={video}
            style={styles.video}
            source={{ uri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isPlay}
        />
    );

    const ImageRender = ({ uri }: { uri: string; }) => (
        <Image
            source={uri}
            style={{ width: '100%', height: '100%' }}
        />
    );

    const renderRightActions = () => {
        if (mediaFiles?.length != 2)
            return;

        return (
            <View style={styles.mediaView}>

                <View style={styles.MediaFileCounter}>
                    <Text style={{ color: 'white', fontSize: 20 }}>2/{mediaFiles?.length}</Text>
                </View>

                {secondFile?.type.includes("image") &&
                    <ImageRender uri={secondFile?.uri} />
                }

                {secondFile?.type.includes("video") &&
                    <VideoRender uri={secondFile?.uri} />
                }
            </View>
        );
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.ModalContainer}>

                <View>

                    {mediaFiles?.length ?

                        <Swipeable
                            renderRightActions={renderRightActions}
                        >
                            <View style={styles.mediaView}>
                                <View style={styles.MediaFileCounter}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>1/{mediaFiles?.length}</Text>
                                </View>

                                {firstFile?.type.includes("image") &&
                                    <ImageRender uri={firstFile?.uri} />
                                }

                                {firstFile?.type.includes("video") &&
                                    <VideoRender uri={firstFile?.uri} />
                                }
                            </View>

                        </Swipeable> :

                        <View style={[styles.mediaView, { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }]}>
                            <Ionicons name="videocam-off-outline" size={60} color="gray" />
                            <Text style={{ color: 'gray' }}>No media file selected </Text>
                        </View>
                    }

                </View>
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
        borderRadius: 8,
        overflow: 'hidden',
        height: '50%'
    },
    video: {
        width: "100%",
        height: "100%"
    },
    mediaView: {
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },
    MediaFileCounter: {
        padding: 2,
        justifyContent: "center",
        position: 'absolute',
        flexDirection: "row",
        top: 10,
        right: 10,
        zIndex: 1,
        borderRadius: 12,
        backgroundColor: 'gray'
    }
    // mediaFilesPreview: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     gap: 10,
    // }
});