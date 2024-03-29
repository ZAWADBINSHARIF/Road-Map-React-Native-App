// external import
import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';


// internal import
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const BackBtn = () => {

    const backStack = () => router.back();

    return (
        <View style={{ marginBottom: 25 }}>
            <TouchableOpacity style={defaultStyles.backBtn} onPress={backStack}>
                <Ionicons name='chevron-back-outline' size={24} color={'white'} />
            </TouchableOpacity>
        </View >
    );
};

export default BackBtn;