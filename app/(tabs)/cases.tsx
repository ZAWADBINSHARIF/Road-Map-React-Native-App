import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';


// internal import
import AdminCases from '@/components/Cases/AdminCases';
import UserCases from '@/components/Cases/UserCases';



const cases = () => {


    const { userInfo } = useSelector((state: any) => state.userInfo);
    console.log(userInfo?.rule);

    const CheckUserRule = (): React.JSX.Element => {
        if (userInfo?.rule === 'admin') {
            return (<AdminCases />);
        }
        else if (userInfo?.rule === 'user') {
            return (
                <UserCases />
            );
        } else {
            return (<UserCases />);
        }
    };

    return (
        <View style={styles.container}>
            <CheckUserRule />
        </View>
    );
};

export default cases;


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12
    }
});