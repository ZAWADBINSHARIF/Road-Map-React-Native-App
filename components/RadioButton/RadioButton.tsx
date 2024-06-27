import { View, TouchableOpacity, StyleSheet, ViewStyle, TouchableOpacityProps, StyleSheetProperties } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Text } from 'react-native-paper';


interface Props {
    title: string,
    value?: false,
    onChangeValue?: () => void;
}

const RadioButton = ({ title = "No Title", value = false, onChangeValue }: Props) => {
    const styles = StyleSheet.create(
        {
            RadioButton: {
                flexDirection: 'row',
                gap: 10,
                backgroundColor: value ? Colors.RadioButtonCheck : 'white',
                padding: 10,
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

