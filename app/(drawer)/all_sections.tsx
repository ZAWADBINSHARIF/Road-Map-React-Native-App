import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dialog, FAB, Icon, List, Portal } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StoreState } from '@/store';


interface Branches {
    _id: String,
    name: String,
    branches: String[] | Branches[],
    caseContainers: any[],

}


const All_Sections = () => {

    const { userInfo } = useSelector((state: StoreState) => state.userInfo);

    const [openAddNewSectionModal, setOpenAddNewSectionModal] = useState(false);
    const [branches, setBranches] = useState<Branches[]>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSectionError, setAddSectionError] = useState<boolean>(false);
    const [backLocationId, setBackLocationId] = useState<Set<String>>(new Set(["/"]));
    const [sectionName, setSectionName] = useState("");

    const handleNewSectionModal = async () => {


        const location_id_array = [...backLocationId.values()];
        const current_location_id = location_id_array[backLocationId.size - 1];

        if (!sectionName || sectionName.trim() === '' || !current_location_id) {
            ToastAndroid.show("Write a proper section", ToastAndroid.SHORT);
            return;
        }

        try {
            await axios("branch/create_new_branch", {
                method: 'POST',
                data: {
                    name: sectionName,
                    location_id: current_location_id
                }
            });

            setAddSectionError(false);

            ToastAndroid.show("New section has been created", ToastAndroid.SHORT);

        } catch (error) {
            setAddSectionError(true);
            console.log(error);

        }

        setSectionName("");
        setOpenAddNewSectionModal(false);
        fetchBranch(current_location_id);
    };

    const fetchBranch = async (location_id: String = '/') => {

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

            // console.log(response.data.branches);

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

    function backToRoot() {
        fetchBranch();
        setBackLocationId(new Set());
    }

    useEffect(() => {
        if (backLocationId.size <= 1)
            fetchBranch();
    }, []);

    return (
        <View style={styles.mainContainer}>

            {backLocationId.size > 1 && !isLoading &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                    <TouchableOpacity onPress={() => backPreviousBranch()}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => backToRoot()}>
                        <AntDesign name="home" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            }


            {branches.length > 0 && !isLoading && !fetchError &&
                <ScrollView>
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
                </ScrollView>
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



            {/* // ** Add new Section Button */}
            {userInfo.rule === 'admin' && userInfo.rule &&
                <FAB
                    icon="plus"
                    style={styles.fab_icon}
                    onPress={() => setOpenAddNewSectionModal(true)}
                    label='Add Section'
                />
            }


            {/* Modal Portal  */}
            <View>

                <Portal>

                    <Dialog visible={openAddNewSectionModal} onDismiss={() => setOpenAddNewSectionModal(false)} style={{ backgroundColor: "white", }}>
                        <Dialog.Title>Add New Section</Dialog.Title>
                        <Dialog.Content>
                            <View style={{ paddingTop: 18 }}>
                                <TextInput
                                    placeholder='Section Name'
                                    style={defaultStyles.inputField}
                                    value={sectionName}
                                    onChangeText={setSectionName}
                                />
                                {
                                    addSectionError &&
                                    <Text style={{ color: 'red' }}>Network problem</Text>
                                }
                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleNewSectionModal}>ADD</Button>
                        </Dialog.Actions>
                    </Dialog>

                </Portal>

            </View>

            <StatusBar style='dark' />
        </View>
    );
};

export default All_Sections;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 12
    },
    fab_icon: {
        position: 'absolute',
        margin: 16,
        right: 16,
        bottom: 16,
        backgroundColor: Colors.CommonBackground
    }
});