import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, width } from '../constants';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  itemWrStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWr: {
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    width: width * 0.9,
    height: width * 0.12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,

  },
  text: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  backIconWr: {
    position: 'absolute',
    left: 10
  }

});

export const SubHeader = ({ text, index }) => {
  const navigation = useNavigation()
  return (
    <View
      style={styles.itemWrStyle}>
      <View style={styles.textWr}>
        <TouchableOpacity style={styles.backIconWr} onPress={() => navigation.goBack()}>
          <Icon name="angle-left" type="FontAwesome" style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};
