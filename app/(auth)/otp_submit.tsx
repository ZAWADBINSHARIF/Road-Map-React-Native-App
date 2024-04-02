// external import
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import axios from 'axios';


// internal import
import BackBtn from '@/components/BackBtn';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';

const otp_submit = () => {

    const { name, email, number, password } = useLocalSearchParams();

    const [OTP, setOTP] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

    const handleSubmitOTP = async () => {
        if (!OTP || OTP.length != 6 || !name || !email || !number || !password) {
            return setErrorMsg('Input 6 digit OTP code');
        }
        setErrorMsg('');

        try {

            setIsLoading(true);

            const response = await axios.post(`${API_BASE_URL}/otp/verifier`, {
                name, email, number, password, otp: OTP
            });
            console.log(response.data);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };


    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>

            <View style={defaultStyles.container}>

                <BackBtn />

                <View style={{ paddingHorizontal: "12%" }}>

                    <View style={{ flexDirection: 'column' }}>

                        <View >
                            <Text style={styles.text1}>OTP CODE</Text>
                            <Text style={styles.text2}>Type your 6 digit OTP code</Text>
                        </View>

                        <View style={{ paddingTop: 28, gap: 15 }}>
                            <View>

                                <TextInput
                                    style={defaultStyles.inputField}
                                    inputMode='numeric'
                                    placeholder='OTP'
                                    value={OTP}
                                    onChangeText={setOTP}
                                />
                                {errorMsg && <Text style={defaultStyles.errorText}>{errorMsg}</Text>}
                            </View>

                            <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.focusBackground }]} onPress={handleSubmitOTP}>
                                {isLoading ?
                                    <ActivityIndicator size="small" />
                                    :
                                    <Text style={{ color: 'white' }}>Submit OTP</Text>
                                }
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </View>

        </SafeAreaView>
    );
};

export default otp_submit;



const styles = StyleSheet.create({
    text1: {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "bold"
    },
    text2: {
        "textAlign": "center",
        "fontWeight": "400"
    }
});