import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';



const RadioButton = ({ title, value = false, onChangeValue = () => { } }) => {
    const styles = StyleSheet.create(
        {
            RadioButton: {
                flexDirection: 'row',
                gap: 10,
                backgroundColor: value ? Colors.RadioButtonCheck : 'white',
                padding: 10
            }
        }
    );
    return (
        <TouchableOpacity onPress={onChangeValue}
            style={styles.RadioButton}>
            <View
                style={value ? defaultStyles.commonRadioBtnChecked : defaultStyles.commonRadioBtn}
            />
            <Text style={{ fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default RadioButton;

