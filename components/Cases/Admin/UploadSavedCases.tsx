import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, MD3Colors, ProgressBar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SavedCase } from '@/interfaces/interfaces';
import { StoreState } from '@/store';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { router } from 'expo-router';
import { setCommonPropertyDefault } from '@/store/slices/commonPropertySlice';
import { setSavedCasesEmpty } from '@/store/slices/savedCaseSlice';


interface Props {
    setShowUploadComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadSavedCases = ({ setShowUploadComponent }: Props) => {

    const allSavedCases: SavedCase[] = useSelector((state: StoreState) => state.savedCase);
    const { caseContainerName, caseLocation, problemList } = useSelector((state: StoreState) => state.commonProperty);
    const dispatch = useDispatch();

    const totalTask = allSavedCases.length;
    const [taskDone, setTaskDone] = useState(0);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const uplaodCasesDebounce = (func: Function, timeout = 500) => {

        if (uploading)
            return;

        let timer: NodeJS.Timeout;

        return () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                func();
            }, timeout);
        };
    };

    const handleRemoveData = () => {
        dispatch(setCommonPropertyDefault());
        dispatch(setSavedCasesEmpty());
        setShowUploadComponent(false);
    };

    const handleUploadCases = async () => {

        let caseContainerId;

        try {
            const response = await axios.post('/caseContainer', {
                caseContainerName,
                caseContainerLocation: caseLocation,
                problemList
            });
            caseContainerId = response.data.caseContainerId;
            setErrorMessage(undefined);
        } catch (error) {
            console.log(error);
            setErrorMessage("Something was wrong");
        }


        for (const index in allSavedCases) {
            const formData = new FormData();
            const obj = allSavedCases[index];

            formData.append('caseContainerId', caseContainerId);

            for (let key in obj) {

                if (obj.hasOwnProperty(key)) {

                    if (key == 'mediaFiles' && obj.mediaFiles && obj.mediaFiles?.length > 0) {
                        console.log(obj.mediaFiles);
                        for (let index in obj.mediaFiles) {
                            formData.append(`case_file${index + 1}`, {
                                uri: obj.mediaFiles[index].uri,
                                name: obj.mediaFiles[index].name,
                                type: obj.mediaFiles[index].type
                            } as any);
                        }

                    } else {
                        formData.append(key, (obj as any)[key]);
                    }
                }
            }

            try {

                setUploading(true);

                const response = await axios.post("/case", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(response.data);
                setTaskDone(prev => ++prev);
                setErrorMessage(undefined);
            } catch (error) {
                console.log(error);
                setErrorMessage("Something was wrong!");
            }

            setUploading(false);

        }

    };

    useEffect(() => {

        const percentage = ((100 / totalTask) * taskDone) / 100;
        setProgress(percentage);

    }, [taskDone]);

    useEffect(() => {
        if (progress >= 1) {
            router.push("/");
            handleRemoveData();
            Toast.show("Case has been uploaded", Toast.LONG);
        }
    }, [progress]);


    return (
        <View
            style={styles.mainContainer}
        >

            <View style={{ flex: 1 }}>
                <View style={{ gap: 5 }}>
                    <ProgressBar
                        progress={progress}
                        color={Colors.SecondBackground}
                        style={{
                            height: 25,
                            borderRadius: 12
                        }}
                    />
                    <Text>Cases has uploaded {Math.round(progress * 100)}%</Text>
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                </View>
            </View>


            <View
                style={{ flexDirection: 'row', gap: 10 }}
            >

                <TouchableOpacity>
                    <Button mode='outlined' onPress={handleRemoveData} style={styles.buttonStyle} labelStyle={{ color: Colors.SecondBackground }}>
                        Delete
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button mode='outlined' onPress={() => console.log('Print')} style={styles.buttonStyle} labelStyle={{ color: Colors.SecondBackground }}>
                        Print
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button
                        mode='outlined'
                        onPress={uplaodCasesDebounce(handleUploadCases)}
                        style={styles.buttonStyle}
                        labelStyle={{ color: Colors.SecondBackground }}
                        disabled={uploading || progress >= 1}
                    >
                        Save
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button mode='outlined' onPress={() => console.log('Assign')} style={styles.buttonStyle} labelStyle={{ color: Colors.SecondBackground }}>
                        Assign
                    </Button>
                </TouchableOpacity>

            </View>
        </View >
    );
};

export default UploadSavedCases;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    buttonStyle: {
        borderRadius: 8,
        borderColor: Colors.SecondBackground,
        borderWidth: 2,
    }
});