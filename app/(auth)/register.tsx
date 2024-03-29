import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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



    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>

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
                                <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.focusBackground, flex: 1 }]}>
                                    <Text style={{ color: 'white' }}>Send OTP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.CommonBackground, flex: 1 }]}>
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