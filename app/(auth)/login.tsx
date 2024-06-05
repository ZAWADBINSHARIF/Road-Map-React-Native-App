import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import useSecureStore from '@/hooks/useSecureStore';
import BackBtn from '@/components/BackBtn';
import { removeLocalStorageThunk, setLocalStorageThunk } from '@/store/slices/userSlice';


const login = () => {

    const [secureTextEntry] = useState(true);
    const [isRemember, setIsRemember] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { saveToken } = useSecureStore();
    const dispatch = useDispatch();


    const handleLogin = async () => {

        if (isLoading)
            return;

        if (!email && !password) {

            setErrorMsg('Fill up email and password');
            return;
        }

        try {

            setIsLoading(true);

            const response = await axios.post(`/login`, {
                email,
                password
            });

            if (isRemember) {
                const userInfoString = JSON.stringify(response.data?.userInfo);

                await saveToken("token", response.data.token);
                dispatch(removeLocalStorageThunk('@userInfo') as any);

                dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);
            }

            router.push('/(drawer)/(tabs)/');

        } catch (error) {
            setErrorMsg('Email and Password are wrong');
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
                            <Text style={styles.text1}>Have an account log in</Text>
                            <Text style={styles.text2}>Enter your email to log in for the Road map app</Text>
                        </View>

                        <View style={{ gap: 15 }}>

                            <View>

                                <View style={{ gap: 10 }}>

                                    <TextInput
                                        autoCapitalize='none'
                                        placeholder='email@domain.com'
                                        keyboardType='email-address'
                                        value={email}
                                        onChangeText={setEmail}
                                        style={[defaultStyles.inputField]}
                                    />
                                    <TextInput
                                        placeholder="password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={secureTextEntry}
                                        style={[defaultStyles.inputField]}
                                    />

                                    {errorMsg && <Text style={defaultStyles.errorText}>{errorMsg}</Text>}

                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <TouchableOpacity>
                                        <Text style={{ textAlign: 'right', color: '#A9A9A9' }}>Forget password?</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 8 }}>

                                    <Checkbox
                                        id=''
                                        style={[defaultStyles.checkBox]}
                                        value={isRemember}
                                        onValueChange={setIsRemember}
                                    />

                                    <Text onPress={() => setIsRemember(!isRemember)} style={{ color: 'gray' }}>Remember me</Text>
                                </View>

                            </View>


                            <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.focusBackground }]} onPress={handleLogin}>
                                {
                                    isLoading ?
                                        (<ActivityIndicator size={'small'} animating={true} />) :
                                        (<Text style={{ color: 'white' }}>
                                            Log in
                                        </Text>)
                                }

                            </TouchableOpacity>


                            <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.CommonBackground }]} onPress={() => router.push('/(auth)/register')}>
                                <Text style={{ color: 'white' }}>
                                    Sign up
                                </Text>
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


            </ScrollView>

        </SafeAreaView>
    );
};

export default login;


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