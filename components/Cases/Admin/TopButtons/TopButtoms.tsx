import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setCommonPropertyDefault } from '@/store/slices/commonPropertySlice';
import { setSavedCasesEmpty } from '@/store/slices/savedCaseSlice';
import CustomDialog from '@/components/CustomDialog';


const TopButtoms = ({ topBtnState, setTopBtnState }: any) => {

  const dispatch = useDispatch();
  const [createNewCasePageDailogVisible, setCreateNewCasePageDailogVisible] = useState<boolean>(false);

  const createNewCasePage = () => {
    dispatch(setCommonPropertyDefault());
    dispatch(setSavedCasesEmpty());
    setCreateNewCasePageDailogVisible(false);
  };


  return (
    <>
      <View style={{ flexDirection: 'row', gap: 20, padding: 16 }}>

        <TouchableOpacity style={topBtnState === 'Cases' ? styles.SelectedTopBtn : styles.TopBtn} onPress={() => setTopBtnState('Cases')}>
          <Text style={topBtnState === 'Cases' ? styles.SelectedText : styles.text}>Cases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={topBtnState === 'List' ? styles.SelectedTopBtn : styles.TopBtn} onPress={() => setTopBtnState('List')}>
          <Text style={topBtnState === 'List' ? styles.SelectedText : styles.text}>List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.TopBtn, { flex: 0, paddingHorizontal: 12 }]} onPress={() => setCreateNewCasePageDailogVisible(true)}>
          <AntDesign name="plus" size={18} color={Colors.SecondBackground} />
        </TouchableOpacity>


      </View>


      {/* Custom Dialog  */}
      <CustomDialog
        visible={createNewCasePageDailogVisible}
        setVisible={setCreateNewCasePageDailogVisible}
        title={"Warning"}
        body={"If you create new case page, you will lose current page data. Are you sure you want to create new case page?"}
        agreeActionBtnTitle='Yes'
        disagreeActionBtnTitle='No'
        agreeActionBtn={createNewCasePage}
      />

    </>
  );
};

export default TopButtoms;


const styles = StyleSheet.create({
  TopBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.SecondBackground
  },
  SelectedTopBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.focusBackground,
    backgroundColor: Colors.focusBackground
  },
  text: {
    textAlign: 'center',
    color: Colors.SecondBackground
  },
  SelectedText: {
    textAlign: 'center',
    color: 'white'
  }
});