import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, TextProps } from '../constants';

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...TextProps,
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export const Button = ({ buttonStyle, textStyle, text, onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={loading ? () => { } : onPress}
      style={{ ...styles.buttonStyle, ...buttonStyle }}>
      {loading ?
        <ActivityIndicator size="small" color="#fff" /> : <Text style={{ ...styles.text, ...textStyle }}>{text}</Text>}
    </TouchableOpacity>
  );
};
