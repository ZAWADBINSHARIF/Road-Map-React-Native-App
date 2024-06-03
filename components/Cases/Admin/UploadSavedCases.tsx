import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, MD3Colors, ProgressBar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SavedCase } from '@/interfaces/interfaces';
import { StoreState } from '@/store';
import axios from 'axios';

const UploadSavedCases = () => {

    const allSavedCases: SavedCase[] = useSelector((state: StoreState) => state.savedCase);
    const { caseContainerName, caseLocation, problemList } = useSelector((state: StoreState) => state.commonProperty);

    const totalTask = allSavedCases.length;
    const [taskDone, setTaskDone] = useState(0);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

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

                    if (key == 'videoFile' && obj.videoFile?.uri) {
                        formData.append("case_file", {
                            uri: obj.videoFile.uri,
                            name: obj.videoFile.name,
                            type: obj.videoFile.type
                        } as any);
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
                style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}
            >

                <TouchableOpacity>
                    <Button mode='outlined' onPress={() => setTaskDone(0)} style={styles.buttonStyle} labelStyle={{ color: Colors.SecondBackground }}>
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
                        onPress={handleUploadCases}
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