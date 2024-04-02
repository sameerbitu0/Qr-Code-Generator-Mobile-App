import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckbox = ({label, isChecked, onToggle}) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={isChecked}
        onValueChange={onToggle}
        tintColors={{true: '#00bfff', false: '#00bfff'}}
      />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  labelText: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'DMSans-Medium',
  },
});

export default CustomCheckbox;
