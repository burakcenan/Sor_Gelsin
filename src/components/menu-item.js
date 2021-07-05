import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, MENU_COLORS,  width } from '../constants';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  itemWrStyle: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  iconWr: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.02,
  },
  textWr: {
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    width: width * 0.68,
    height: width * 0.12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: COLORS.WHITE,
    fontSize: 22,
  },
  text: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
});

export const MenuItem = ({ itemWrStyle, item, index }) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={{ ...styles.itemWrStyle, ...itemWrStyle }}>
      <View style={{ ...styles.iconWr, backgroundColor: MENU_COLORS[index] }}>
        <Icon
          name={item.iconName}
          type={item.iconType || 'AntDesign'}
          style={styles.iconStyle}
        />
      </View>
      <View style={styles.textWr}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
