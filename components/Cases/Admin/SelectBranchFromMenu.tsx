import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon, List, Menu, Modal, Portal, Button } from 'react-native-paper';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCaseLocation } from '@/store/slices/commonPropertySlice';


interface Props {
    visible: boolean,
    closeModal: (value: React.SetStateAction<boolean>) => void;
}

interface Branches {
    _id: string,
    name: String,
    branches: String[] | Branches[],
    caseContainers: any[],

}

const SelectBranchFromMenu = ({ visible, closeModal }: Props) => {

    const [branches, setBranches] = useState<Branches[]>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [backLocationId, setBackLocationId] = useState<Set<string>>(new Set(["/"]));

    const dispatch = useDispatch();

    const fetchBranch = async (location_id: string = '/') => {

        setIsLoading(true);
        setFetchError(false);
        try {

            const response = await axios("/branch/get_branch", {
                'method': 'GET',
                'params': {
                    location_id
                }
            });

            setBranches(response?.data?.branches);

            setBackLocationId(prev => new Set([...prev, location_id]));

        } catch (error) {
            setFetchError(true);
            console.log(error);
        }

        setIsLoading(false);
    };

    function backPreviousBranch() {

        const location_id_array = [...backLocationId.values()];
        const current_location_id = location_id_array[backLocationId.size - 1];
        const previous_lacation_id = location_id_array[backLocationId.size - 2];

        fetchBranch(previous_lacation_id);

        setBackLocationId(prev => {
            if (current_location_id !== '/') {
                prev.delete(current_location_id);
            }

            return new Set(prev);
        });

    }

    function handleSetCaseLocation() {
        const location_id_array = [...backLocationId.values()];
        const current_location_id = location_id_array[backLocationId.size - 1];

        dispatch(setCaseLocation({ location: current_location_id }));
        closeModal(false);
    }

    function backToRoot() {
        fetchBranch();
        setBackLocationId(new Set());
    }

    useEffect(() => {
        if (backLocationId.size <= 1)
            fetchBranch();
    }, []);



    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => closeModal(false)}
                contentContainerStyle={styles.ModalContainer}
            >

                <View style={styles.mainViewContainer}>

                    {backLocationId.size > 1 && !isLoading &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                            <TouchableOpacity onPress={() => backPreviousBranch()}>
                                <Ionicons name="arrow-back-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <Button mode="outlined" textColor='black' style={{ 'borderColor': 'black' }} onPress={() => handleSetCaseLocation()}>
                                Select
                            </Button>
                            <TouchableOpacity onPress={() => backToRoot()}>
                                <AntDesign name="home" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    }


                    {branches.length > 0 && !isLoading && !fetchError &&

                        <FlashList
                            data={branches}
                            estimatedItemSize={71}
                            renderItem={({ item }) => {
                                const branch_length = item?.branches?.length;
                                const case_length = item?.caseContainers?.length;
                                const icon_name = branch_length > 0 && case_length > 0 ? 'source-branch-check' : branch_length <= 0 && case_length <= 0 ? 'source-branch-remove' : branch_length <= 0 && case_length > 0 ? 'folder-text' : 'source-branch';

                                return (
                                    <TouchableOpacity onPress={() => fetchBranch(item._id)}>

                                        <List.Item
                                            title={item.name}
                                            description={`Branch ${branch_length} Case ${case_length}`}
                                            left={props => <List.Icon {...props} icon={icon_name} />}
                                        />

                                    </TouchableOpacity>
                                );
                            }}
                        />

                    }


                    {branches.length == 0 && !isLoading && !fetchError &&
                        <View style={{
                            flex: 1,
                            'justifyContent': 'center',
                            'alignItems': 'center'
                        }}>
                            <Icon source={'source-branch-remove'} size={52} />
                            <Text>There is no Branch and Case</Text>
                        </View>
                    }

                    {isLoading &&
                        <View
                            style={{
                                flex: 1,
                                'justifyContent': 'center',
                                'alignItems': 'center',
                                gap: 12
                            }}
                        >
                            <ActivityIndicator animating={true} size={'large'} color={'black'} />
                            <Text>Geting the data...</Text>
                        </View>
                    }

                    {!isLoading && fetchError &&
                        <View
                            style={{
                                flex: 1,
                                'justifyContent': 'center',
                                'alignItems': 'center',
                                gap: 12
                            }}
                        >
                            <MaterialIcons name="error-outline" size={52} color="black" />
                            <Text>Something went wrong...</Text>
                            <Button icon="reload" mode="contained-tonal" buttonColor={Colors.CommonBackground} onPress={() => fetchBranch()}>
                                Try again
                            </Button>
                        </View>
                    }


                </View>

            </Modal >
        </Portal>
    );
};

export default SelectBranchFromMenu;


const styles = StyleSheet.create({
    ModalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        padding: 16,
        borderRadius: 8,
        height: '50%'
    },
    mainViewContainer: {
        flex: 1,
    },
});