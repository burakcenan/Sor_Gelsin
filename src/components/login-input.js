import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { COLORS, width } from '../constants';

const styles = StyleSheet.create({
  inputWr: {
    margin: 10,
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    fontSize: 18,
  },
  inputStyle: { flex: 1, marginHorizontal: 5, color: COLORS.PRIMARY, padding: 5 },

  borderActive: {
    borderBottomColor: COLORS.PRIMARY,
    borderBottomWidth: 2,
  },

  borderPassive: {
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 2,
  },
});

export const LoginInput = ({
  wrapperStyle,
  leftIcon,
  placeholder,
  inputStyle,
  password,
  value,
  onChange
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View
      style={[
        styles.inputWr,
        wrapperStyle,
        isFocus ? styles.borderActive : styles.borderPassive,
      ]}>
      {leftIcon &&
        leftIcon([
          styles.iconStyle,
          { color: isFocus ? COLORS.PRIMARY : COLORS.GRAY },
        ])}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={{ ...styles.inputStyle, ...inputStyle }}
        placeholderTextColor={COLORS.GRAY}
        secureTextEntry={password}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
    </View>
  );
};
