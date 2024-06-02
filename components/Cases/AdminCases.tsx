import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultStyles } from '@/constants/Styles';
import GenerateAlgorithmSection from './Admin/GenerateAlgorithmSection';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TopButtoms from './Admin/TopButtons/TopButtoms';
import AdminList from './Admin/List/AdminList';
import SavedCase from './Admin/SavedCase';
import { setPageNumber } from '@/store/slices/commonPropertySlice';
import UploadSavedCases from './Admin/UploadSavedCases';
import { StoreState } from '@/store';

const adminCases = () => {

    const dispatch = useDispatch();
    const [topBtnState, setTopBtnState] = useState<'Cases' | 'List'>('Cases');
    const savedCases = useSelector((state: StoreState) => state?.savedCase);
    const pageNo = useSelector((state: StoreState) => state.commonProperty.pageNo);
    const createNextPage = useSelector((state: StoreState) => state.commonProperty.createNextPage);
    const [showUploadComponent, setShowUploadComponent] = useState<boolean>(false);

    const nextPage = () => {

        if (savedCases.length == 0) {
            ToastAndroid.show("At list you have to create on case in the first page", ToastAndroid.LONG);
            return;
        }

        if (createNextPage && pageNo == 1) {
            console.log(pageNo);
            console.log("second page");
            dispatch(setPageNumber(pageNo + 1));
            return;
        }

        setShowUploadComponent(true);
        console.log("save page");

    };

    const previousPage = () => {
        if (!showUploadComponent && pageNo == 2) {
            dispatch(setPageNumber(pageNo - 1));
        }
        if (showUploadComponent) {
            setShowUploadComponent(false);
        }
    };

    return (
        <View style={styles.mainContainer}>

            {/* // ** Top buttoms for Cases and List */}
            <TopButtoms
                topBtnState={topBtnState}
                setTopBtnState={setTopBtnState}
            />

            {
                topBtnState === 'List' &&
                <AdminList />
            }

            {
                topBtnState === 'Cases' &&

                <>
                    {

                        showUploadComponent ?
                            (
                                <UploadSavedCases />
                            )
                            :

                            <KeyboardAvoidingView
                                style={{
                                    flex: 1,
                                }}
                            >

                                <View style={styles.createdAlgorithmListSection}>
                                    <ScrollView>
                                        {
                                            savedCases.length <= 0 &&
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#808080dd' }}>No case created</Text>
                                            </View>
                                        }

                                        {
                                            savedCases.map((item: any, index: number) => {
                                                if (pageNo == item.pageNo) {
                                                    return <SavedCase {...item} index={index} key={index} />;
                                                }
                                            })
                                        }

                                    </ScrollView>
                                </View>

                                <View style={[defaultStyles.seperatorView, { marginHorizontal: 0, marginVertical: 10 }]}>
                                    <View
                                        style={{
                                            flex: 1,
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                </View>


                                <GenerateAlgorithmSection />

                            </KeyboardAvoidingView>
                    }
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingBottom: 10, paddingTop: 10 }}>

                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={previousPage}
                        >
                            <AntDesign name="left" size={20} color={Colors.RoundBtnText} />
                            <Text style={{ color: Colors.RoundBtnText }}>Previous</Text>
                        </TouchableOpacity>

                        {
                            !showUploadComponent &&
                            <TouchableOpacity style={{ flexDirection: 'row' }}
                                onPress={nextPage}
                            >
                                <Text style={{ color: Colors.RoundBtnText }}>Next</Text>
                                <AntDesign name="right" size={20} color={Colors.RoundBtnText} />
                            </TouchableOpacity>
                        }
                    </View>


                </>
            }


        </View >
    );
};

export default adminCases;


const styles = StyleSheet.create({
    mainContainer: {
        'height': '100%',
    },
    createdAlgorithmListSection: {
        flex: 1
    },

});