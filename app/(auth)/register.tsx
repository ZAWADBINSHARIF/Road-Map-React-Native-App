// external import
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import axios from 'axios';

// internal import
import BackBtn from '@/components/BackBtn';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const register = () => {

    const [secureTextEntry] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [recomfirmPassword, setRecomfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

    const checkFormValidation = () => {

        if (!name) {
            setErrorMsg('Name is required.');
            return false;
        } else if (!email) {
            setErrorMsg('Email is required.');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMsg('Email is invalid.');
            return false;
        } else if (!number) {
            setErrorMsg('Phone number is required.');
            return false;
        } else if (!password) {
            setErrorMsg('Password is required.');
            return false;
        } else if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return false;
        } else if (password !== recomfirmPassword) {
            setErrorMsg('Recomfirm password not match.');
            return false;
        } else {
            setErrorMsg('');
            return true;
        }

    };


    const handleOTP = async () => {
        if (!checkFormValidation() || isLoading === true)
            return;
        console.log(API_BASE_URL);
        try {

            setIsLoading(true);

            await axios.post(`${API_BASE_URL!}/otp`, {
                name: name.trim(),
                email: email.trim(),
                number,
                password
            });

            router.push({
                pathname: "/(auth)/otp_submit",
                params: {
                    name,
                    email,
                    number,
                    password
                }
            });

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>

            <ScrollView>


                <View style={defaultStyles.container}>

                    <BackBtn />

                    <View style={{ paddingHorizontal: "12%" }}>

                        <View style={{ marginBottom: 50 }}>
                            <Text style={styles.text1}>Create an account</Text>
                            <Text style={styles.text2}>Enter your email to sign up for the Road map app</Text>
                        </View>


                        <View style={{ gap: 15 }}>

                            <View style={{ gap: 15 }}>

                                <TextInput
                                    placeholder='Full Name'
                                    value={name}
                                    onChangeText={setName}
                                    style={[defaultStyles.inputField]}
                                />
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={setEmail}
                                    style={[defaultStyles.inputField]}
                                />
                                <TextInput
                                    placeholder='Phone Number'
                                    keyboardType='phone-pad'
                                    value={number}
                                    onChangeText={setNumber}
                                    style={[defaultStyles.inputField]}
                                />
                                <TextInput
                                    placeholder="password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={secureTextEntry}
                                    style={[defaultStyles.inputField]}
                                />
                                <TextInput
                                    placeholder="Recomfirm Password"
                                    value={recomfirmPassword}
                                    onChangeText={setRecomfirmPassword}
                                    secureTextEntry={secureTextEntry}
                                    style={[defaultStyles.inputField]}
                                />

                                {errorMsg && <Text style={defaultStyles.errorText}>{errorMsg}</Text>}

                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 30 }}>
                                    <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.focusBackground, flex: 1 }]} onPress={handleOTP}>
                                        {isLoading ?
                                            <ActivityIndicator size="small" />
                                            :
                                            <Text style={{ color: 'white' }}>Send OTP</Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.CommonBackground, flex: 1 }]} onPress={() => router.push('/(auth)/login')}>
                                        <Text style={{ color: 'white' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={defaultStyles.seperatorView}>
                                    <View
                                        style={{
                                            flex: 1,
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />

                                    <Text style={defaultStyles.seperator}>or</Text>

                                    <View
                                        style={{
                                            flex: 1,
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                </View>

                                <View>
                                    <TouchableOpacity style={[defaultStyles.btn, { flexDirection: 'row', gap: 5 }]}>
                                        <Image source={require('@/assets/icons/google_logo.png')} style={{ width: 24, height: 24 }} />
                                        <Text style={{ fontWeight: 'bold' }}>Google</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>


                    </View>

                </View>


            </ScrollView>

        </SafeAreaView>
    );
};

export default register;


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