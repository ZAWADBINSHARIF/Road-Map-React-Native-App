import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';


interface Props {
    title: string,
    body: string,
    actionBtnTitle?: string;
}


const CustomDialog = (props: Props) => {

    const [visible, setVisible] = React.useState(true);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Dialog visible={visible} >
                    <Dialog.Title>{props.title}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{props.body}</Text>
                    </Dialog.Content>
                    {props.actionBtnTitle &&
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>{props.actionBtnTitle}</Button>
                        </Dialog.Actions>
                    }
                </Dialog>
            </Portal>
        </View>
    );
};

export default CustomDialog;