import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Modal, Portal } from 'react-native-paper';
import { Image } from 'expo-image';
import { Swipeable } from 'react-native-gesture-handler';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';



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
    mediaFiles,
}: Props) => {

    const API_BASE_URI = process.env.EXPO_PUBLIC_API_BASE_URL;
    const video = React.useRef(null);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [videoLoadingError, setVideoLoadingError] = useState<boolean>(false);
    const [imageLoadingError, setImageLoadingError] = useState<boolean>(false);
    const firstFile = (mediaFiles as any)[0];
    const secondFile = (mediaFiles as any)[1];

    function uriModifier(uri: string): string {
        uri = uri.startsWith("file:///") ? uri : `${API_BASE_URI}${uri}`;
        return uri;
    }

    const VideoRender = ({ uri }: { uri: string; }) => {
        uri = uriModifier(uri);
        return (
            <>
                {videoLoadingError &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="error" size={heightPercentageToDP(7)} color="white" />
                        <Text style={{ color: 'white' }}>Something was wrong</Text>
                    </View>
                }
                {!videoLoadingError &&
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{ uri }}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isPlay}
                        onError={(e) => {
                            console.log(e);
                            setVideoLoadingError(true);
                        }}
                        useNativeControls
                    />
                }
            </>
        );
    };

    const ImageRender = ({ uri }: { uri: string; }) => {
        uri = uriModifier(uri);
        return (
            <>
                {imageLoadingError &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="error" size={heightPercentageToDP(7)} color="white" />
                        <Text style={{ color: 'white' }}>Something was wrong</Text>
                    </View>
                }
                {!imageLoadingError &&
                    <Image
                        source={uri}
                        style={{ width: '100%', height: '100%' }}
                        onError={(e) => {
                            console.log(e);
                            setImageLoadingError(true);
                        }}
                    />
                }
            </>
        );
    };

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