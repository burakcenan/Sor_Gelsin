import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import { COLORS, } from '../constants';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  socialTextWr: {
    flex: 1,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  socialIconsWr: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialItem: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    color: COLORS.WHITE,
    fontSize: 22,
  },
});

export const Social = ({ }) => {
  return (
    <View style={styles.socialTextWr}>
      <Text style={styles.socialText}>
        Bizi sosyal medyadan takip etmek için
      </Text>
      <View style={styles.socialIconsWr}>
        <TouchableOpacity style={styles.socialItem} onPress={() => Linking.openURL('https://facebook.com')}>
          <Icon
            name="facebook"
            type="FontAwesome"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialItem} onPress={() => Linking.openURL('https://instagram.com')}>
          <Icon
            name="instagram"
            type="FontAwesome"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialItem} onPress={() => Linking.openURL('https://twitter.com')}>
          <Icon
            name="twitter"
            type="FontAwesome"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
