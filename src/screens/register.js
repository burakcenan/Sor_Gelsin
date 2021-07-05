import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { width, height, TextProps } from '../constants';
import { Button, LoginInput } from '../components';
import firestore from '@react-native-firebase/firestore';
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
    marginBottom: width * 0.1,
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

export const RegisterScreen = props => {

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState('');
  const register = () => {
    if (loading) {
      return;
    } setLoading(true)
    if (name === '') {
      alert('İsim boş geçilemez.')
      setLoading(false)
    } else if (mail === '') {
      alert('Mail boş geçilemez.')
      setLoading(false)
    } else if (password === '') {
      alert('Şifre boş geçilemez.')
      setLoading(false)
    } else if (school === '') {
      alert('Okul boş geçilemez.')
      setLoading(false)
    } else {
      auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
          const user = auth().currentUser;
          firestore()
            .collection('Users').doc(user.uid)
            .set({
              name,
              school,
              id: user.uid,
              mail,
            })
            .then(() => {
              AsyncStorage.setItem('token', user.uid)
              props.navigation.navigate('HomeScreen')
              setLoading(false)
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert("Mail adresi daha önce kullanılmış. Lütfen giriş yapınız.")
          }
          else if (error.code === 'auth/invalid-email') {
            alert("Mail adresi geçersiz. Lütfen tekrar giriniz.")
          } else {
            alert("Bilinmeyen bir hata oluştu.")
          }
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
            value={name}
            onChange={(text) => setName(text)}
            leftIcon={iconStyle => {
              return <Icon name="user" type="Feather" style={iconStyle} />;
            }}
            placeholder={'İsim'}
          />
          <LoginInput
            value={mail}
            onChange={(text) => setMail(text)}
            leftIcon={iconStyle => {
              return <Icon name="mail" type="Feather" style={iconStyle} />;
            }}
            placeholder={'Mail'}
          />
          <LoginInput
            value={password}
            onChange={(text) => setPassword(text)}
            leftIcon={iconStyle => {
              return <Icon name="lock" type="Feather" style={iconStyle} />;
            }}
            placeholder={'Şifre'}
            password
          />
          <LoginInput
            value={school}
            onChange={(text) => setSchool(text)}
            leftIcon={iconStyle => {
              return <Icon name="home" type="Feather" style={iconStyle} />;
            }}
            placeholder={'Okul'}
          />
        </View>
        <View style={styles.buttonWr}>
          <Button
            onPress={register}
            textStyle={styles.signButtonText}
            buttonStyle={styles.signButton}
            text={'Kayıt Ol'}
            loading={loading}
          />
        </View>
      </Content>
    </Container>
  );
};
