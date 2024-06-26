import { StyleSheet } from "react-native";
import Colors from "./Colors";



export const defaultStyles = StyleSheet.create({
    container: {
        "backgroundColor": "#ffffff",
        "height": "100%",
        "flexDirection": "column"
    },
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
        marginVertical: 20,
        marginHorizontal: "12%"
    },
    inputField: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    defaultInputField: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 12,
        backgroundColor: Colors.inputBackgroundColor,
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
    commonRadioBtn: {
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: Colors.focusBackground,
        width: 20
    },
    commonRadioBtnChecked: {
        borderRadius: 20,
        backgroundColor: Colors.focusBackground,
        borderWidth: 3,
        borderColor: 'white',
        width: 20,
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