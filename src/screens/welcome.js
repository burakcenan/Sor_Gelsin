import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Container, Content, } from 'native-base';
import { width, height, TextProps, COLORS } from '../constants';
import { Button, Social } from '../components';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    padding: width * 0.05,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
    marginTop: height * 0.1,
  },
  textWr: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  helloText: {
    ...TextProps,
    fontWeight: 'bold',
    fontSize: 30,
  },
  expText: {
    ...TextProps,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsWr: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.09,
  },
  signButton: {
    width: width * 0.42,
    borderRadius: 25,
    height: 45,
  },
  signButtonText: {},

});

export const WelcomeScreen = props => {
  return (
    <Container>
      <Content style={styles.wr}>
        <Image
          source={require('../assets/image/welcome.png')}
          style={styles.image}
        />
        <View style={styles.textWr}>
          <Text style={styles.helloText}>Hoş Geldiniz!</Text>
          <Text style={styles.expText}>
            Her türlü soru çözümlerinizde yanınızdayız!
          </Text>
        </View>
        <View style={styles.buttonsWr}>
          <Button
            onPress={() => props.navigation.navigate('RegisterScreen')}
            textStyle={styles.signButtonText}
            buttonStyle={styles.signButton}
            text={'Kayıt Ol'}
            loading={false}
          />
          <Button
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}
            textStyle={{ ...styles.signButtonText, color: COLORS.PRIMARY }}
            buttonStyle={{
              ...styles.signButton,
              borderColor: COLORS.PRIMARY,
              borderWidth: 1,
              backgroundColor: COLORS.WHITE,
            }}
            loading={false}
            text={'Giriş Yap'}
          />
        </View>
        <Social />
      </Content>
    </Container>
  );
};
