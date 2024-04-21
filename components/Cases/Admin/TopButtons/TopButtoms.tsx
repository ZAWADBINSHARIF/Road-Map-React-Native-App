import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

const TopButtoms = ({ topBtnState, setTopBtnState }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 20, padding: 16 }}>
      <TouchableOpacity style={topBtnState === 'Cases' ? styles.SelectedTopBtn : styles.TopBtn} onPress={() => setTopBtnState('Cases')}>
        <Text style={topBtnState === 'Cases' ? styles.SelectedText : styles.text}>Cases</Text>
      </TouchableOpacity>
      <TouchableOpacity style={topBtnState === 'List' ? styles.SelectedTopBtn : styles.TopBtn} onPress={() => setTopBtnState('List')}>
        <Text style={topBtnState === 'List' ? styles.SelectedText : styles.text}>List</Text>
      </TouchableOpacity>
    </View>
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