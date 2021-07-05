import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height } from '../../constants';
import { SubHeader, ProfileItem, Button } from '../../components';
import firestore from '@react-native-firebase/firestore';

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
  button: { width: width * 0.5, marginTop: height * 0.1 }
});

export const ProfileScreen = props => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState(false);
  const infoItems = [
    {
      text: 'İsim',
      value: name,
      onChange: (text) => setName(text)
    },
    {
      text: 'Telefon',
      value: phone,
      onChange: (text) => setPhone(text),
      inputType: 'numeric'
    },
    {
      text: 'Mail',
      value: mail,
      onChange: (text) => setMail(text),
      editable: false
    },
    {
      text: 'Okul',
      value: school,
      onChange: (text) => setSchool(text)
    },
  ];
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    firestore()
      .collection('Users').doc(token)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const user = documentSnapshot.data()
          setName(user?.name)
          setPhone(user?.phone)
          setMail(user?.mail)
          setSchool(user?.school)
        }
      });
  }
  const setData = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const token = await AsyncStorage.getItem('token')
    firestore()
      .collection('Users').doc(token)
      .update({
        name, mail, phone, school
      })
      .then(() => {
        console.log('User exists: ');
        props.navigation.goBack()
        setLoading(false)
      }).catch(err => {
        console.log(err)
        alert('Bilinmeyen bir hata oluştu.')
        setLoading(false)
      })
  }

  return (
    <Container>
      <Content style={styles.wr}>
        <SubHeader text={'Profilim'} />
        <View style={styles.itemWr}>
          {infoItems.map((item, index) => {
            return (
              <ProfileItem
                index={index}
                item={item}
                itemWrStyle={styles.itemStyle}
              />
            );
          })}
          <Button
            onPress={setData}
            buttonStyle={styles.button}
            text={'Kaydet'}
            loading={loading}
          />
        </View>

      </Content>
    </Container>
  );
};
