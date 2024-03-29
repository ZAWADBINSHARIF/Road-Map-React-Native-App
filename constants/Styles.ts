import { StyleSheet } from "react-native";
import Colors from "./Colors";



export const defaultStyles = StyleSheet.create({
    errorText: {
        color: 'red'
    },
    seperator: {
        color: "gray"
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: "12%"
    },
    inputField: {
        // height: 44,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    btn: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: Colors.CommonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBox: {
        borderRadius: 5,
        backgroundColor: Colors.CommonBackground,
        borderWidth: 0,
        borderColor: 'none'
    },
    backBtn: {
        marginTop: "3%",
        marginStart: "4%",
        maxWidth: 24,
        color: "white",
        backgroundColor: Colors.CommonBackground,
        borderRadius: 5,
    }
});