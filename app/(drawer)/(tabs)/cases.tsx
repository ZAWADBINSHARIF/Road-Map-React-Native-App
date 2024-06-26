import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


// internal import
import AdminCases from '@/components/Cases/AdminCases';
import UserCases from '@/components/Cases/UserCases';
import { StoreState } from '@/store';


const cases = () => {


    const { userInfo } = useSelector((state: StoreState) => state.userInfo);
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