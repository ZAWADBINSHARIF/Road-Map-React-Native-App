import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// internal import
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const login = () => {

    const [secureTextEntry] = useState(true);


    const [isRemember, setIsRemember] = useState(false);
    const [password, setPassword] = useState("");


    const backStack = () => router.back();

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>



            <View style={styles.container}>


                <View>
                    <TouchableOpacity style={defaultStyles.backBtn} onPress={backStack}>
                        <Ionicons name='chevron-back-outline' size={24} color={'white'} />
                    </TouchableOpacity>
                </View>


                <View style={{ marginBottom: 50, marginTop: 25 }}>
                    <Text style={styles.text1}>Have an account log in</Text>
                    <Text style={styles.text2}>Enter your email to log in for the Road map app</Text>
                </View>

                <View style={{ gap: 15 }}>

                    <View>

                        <View style={{ gap: 10 }}>

                            <TextInput
                                autoCapitalize='none'
                                placeholder='email@domain.com'
                                style={[defaultStyles.inputField, { marginHorizontal: "12%" }]}
                            />
                            <TextInput
                                placeholder="password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureTextEntry}
                                style={[defaultStyles.inputField, { marginHorizontal: "12%" }]}
                            />

                        </View>

                        <View style={{ marginHorizontal: "12%", marginTop: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ textAlign: 'right', color: '#A9A9A9' }}>Forget password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 8 }}>

                            <Checkbox
                                style={[defaultStyles.checkBox, { marginStart: "12%" }]}
                                value={isRemember}
                                onValueChange={setIsRemember}
                            />

                            <Text style={{ color: 'gray' }}>Remember me</Text>
                        </View>

                    </View>


                    <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: '#004A7B', marginHorizontal: "12%" }]}>
                        <Text style={{ color: 'white' }}>
                            Log in
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.CommonBackground, marginHorizontal: "12%" }]}>
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
                    <TouchableOpacity style={[defaultStyles.btn, { marginHorizontal: "12%", flexDirection: 'row', gap: 5 }]}>
                        <Image source={require('@/assets/icons/google_logo.png')} style={{ width: 24, height: 24 }} />
                        <Text style={{ fontWeight: 'bold' }}>Google</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </SafeAreaView>
    );
};

export default login;


const styles = StyleSheet.create({
    container: {
        "backgroundColor": "#ffffff",
        "height": "100%",
        "flexDirection": "column",
    },
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