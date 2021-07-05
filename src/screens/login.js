import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { width, height, TextProps } from '../constants';
import { Button, LoginInput } from '../components';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    padding: width * 0.05,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  buttonWr: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.08,
    marginBottom: width * 0.2,
  },
  inputWr: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.1,
  },
  signButton: {
    width: width * 0.42,
    borderRadius: 25,
    height: 45,
  },
  signButtonText: {},
  logUpTextWr: {
    alignItems: 'center',
  },
  logUpText: {
    ...TextProps,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  logUpWr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...TextProps,
    fontWeight: 'bold',
    fontSize: 30,
    width: width * 0.9,
    textAlign: 'center',
    marginVertical: height * 0.05,
  },
});

export const LoginScreen = props => {

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const login = () => {
    if (loading) {
      return;
    } setLoading(true)
    if (mail === '') {
      alert('Mail boş geçilemez.')
      setLoading(false)
    } else if (password === '') {
      alert('Şifre boş geçilemez.')
      setLoading(false)
    } else {
      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {
          const user = auth().currentUser;
          console.log(user)
          AsyncStorage.setItem('token', user.uid)
          props.navigation.navigate('HomeScreen')
          setLoading(false)
        })
        .catch(error => {

          alert("Hatalı kullanıcı adı ve/veya şifre!")
          setLoading(false)
          console.error(error);
        });
    }

  }
  return (
    <Container>
      <Content style={styles.wr}>
        <Text style={styles.headerText}>Hoş Geldiniz!</Text>
        <Image
          source={require('../assets/image/login.png')}
          style={styles.image}
        />

        <View style={styles.inputWr}>
          <LoginInput
            value={mail}
            onChange={text => setMail(text)}
            leftIcon={iconStyle => {
              return <Icon name="mail" type="Feather" style={iconStyle} />;
            }}
            placeholder={'Mail'}
          />

          <LoginInput
            value={password}
            onChange={text => setPassword(text)}
            leftIcon={iconStyle => {
              return <Icon name="lock" type="Feather" style={iconStyle} />;
            }}
            placeholder={'Şifre'}
            password
          />
        </View>
        <View style={styles.buttonWr}>
          <Button
            onPress={login}
            textStyle={styles.signButtonText}
            buttonStyle={styles.signButton}
            text={'Giriş Yap'}
            loading={loading}
          />
        </View>
        <View style={styles.logUpTextWr}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.logUpText}>İlk defa mı karşılaşıyoruz? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('RegisterScreen')}>
              <Text
                style={{
                  ...styles.logUpText,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};
