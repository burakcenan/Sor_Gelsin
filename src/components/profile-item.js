import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { COLORS, width } from '../constants';

const styles = StyleSheet.create({
  itemWrStyle: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWr: {
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    width: width * 0.8,
    height: width * 0.12,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },

  text: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },

  textInput: { flex: 1, color: COLORS.BLACK }
});

export const ProfileItem = ({ itemWrStyle, item, index }) => {
  return (
    <View
      style={{ ...styles.itemWrStyle, ...itemWrStyle }}>
      <View style={styles.textWr}>
        <Text style={styles.text}>{item.text + ': '}</Text>
        <TextInput placeholder={item.text} style={styles.textInput} placeholderTextColor={COLORS.GRAY} value={item.value} onChangeText={item.onChange} keyboardType={item.inputType} editable={item.editable} />
      </View>
    </View>
  );
};
