import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, MD3Colors, ProgressBar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SavedCase } from '@/interfaces/interfaces';
import { StoreState } from '@/store';

const UploadSavedCases = () => {

    const allSavedCases: SavedCase[] = useSelector((state: StoreState) => state.savedCase);
    const totalTask = 7 | allSavedCases.length;
    const [taskDone, setTaskDone] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleUploadCases = () => {
        setTaskDone(prev => ++prev);
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
                <ProgressBar
                    progress={progress}
                    color={Colors.SecondBackground}
                    style={{
                        height: 25,
                        borderRadius: 12
                    }}
                />
                <Text>{Math.round(progress * 100)}%</Text>
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
                    <Button mode='outlined'
                        onPress={handleUploadCases}
                        style={styles.buttonStyle}
                        labelStyle={{ color: Colors.SecondBackground }}>
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