import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, width } from '../constants';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  itemWrStyle: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textWr: {
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    width: width * 0.8,
    height: width * 0.12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },

  text: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  value: {
    color: COLORS.PRIMARY,
  },
});

export const InfoItem = ({ itemWrStyle, item, index }) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={{ ...styles.itemWrStyle, ...itemWrStyle }}>
      <View style={styles.textWr}>
        <Text style={styles.text}>{item.text + ': '}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );
};
