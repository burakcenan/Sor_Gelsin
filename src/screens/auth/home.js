import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height } from '../../constants';
import { MenuItem } from '../../components';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    padding: width * 0.05,
  },
  itemWr: {
    width: width * 0.9,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: { marginVertical: 15 },
});

export const HomeScreen = props => {
  const menuItems = [
    {
      iconName: 'user',
      text: 'Profilim',
      onPress: () => props.navigation.navigate('ProfileScreen')
    },
    {
      iconName: 'questioncircleo',
      text: 'Soru Sor',
      onPress: () => props.navigation.navigate('AskQuestionScreen')
    },
    {
      iconName: 'inbox',
      text: 'Sorular',
      onPress: () => props.navigation.navigate('ListQuestionScreen')
    },
    {
      iconName: 'customerservice',
      text: 'Bize Ulaşın',
      onPress: () => props.navigation.navigate('InfoScreen')
    },
    {
      iconName: 'logout',
      text: 'Çıkış Yap',
      onPress: () => logout()
    },
  ];
  const logout = () => {
    AsyncStorage.removeItem('token');
    props.navigation.navigate('WelcomeScreen')
  }
  return (
    <Container>
      <Content style={styles.wr}>
        <View style={styles.itemWr}>
          {menuItems.map((item, index) => {
            return (
              <MenuItem
                index={index}
                item={item}
                itemWrStyle={styles.itemStyle}
              />
            );
          })}
        </View>
      </Content>
    </Container>
  );
};
