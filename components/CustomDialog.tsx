import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';


interface Props {
    title?: string,
    body: string,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    agreeActionBtnTitle?: string,
    disagreeActionBtnTitle?: string,
    agreeActionBtn?: () => void,
    disagreeActionBtn?: () => void;
    style?: ViewStyle;
}


const CustomDialog = (
    {
        visible,
        setVisible,
        title,
        body,
        agreeActionBtnTitle,
        disagreeActionBtnTitle,
        agreeActionBtn,
        disagreeActionBtn = () => setVisible(false),
        style
    }: Props) => {


    const hideDialog = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={style}>
                    {title && <Dialog.Title>{title}</Dialog.Title>}
                    <Dialog.Content>
                        <Text variant="bodyMedium">{body}</Text>
                    </Dialog.Content>
                    {agreeActionBtnTitle &&
                        <Dialog.Actions>
                            <Button onPress={disagreeActionBtn}>{disagreeActionBtnTitle}</Button>
                            <Button onPress={agreeActionBtn}>{agreeActionBtnTitle}</Button>
                        </Dialog.Actions>
                    }
                </Dialog>
            </Portal>
        </View >
    );
};

export default CustomDialog;