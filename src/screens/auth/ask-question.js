import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height, COLORS } from '../../constants';
import { SubHeader, Button } from '../../components';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    padding: width * 0.05,
  },
  photoWr: {
    width: width * 0.9,
    height: height * 0.5,
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 15, overflow: 'hidden'
  },
  itemStyle: { marginVertical: 15 },
  button: { width: width * 0.7, marginTop: height * 0.05, marginHorizontal: width * 0.1 },
  image: { width: width * 0.9, height: height * 0.5, }
});

export const AskQuestionScreen = props => {

  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(undefined);

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1
      },
      response => {
        if (!response?.didCancel) {
          console.log(response.assets[0].uri);
          setImage(response.assets[0].uri);
        }
      },
    );
  };
  const selectImageCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1
      },
      response => {
        if (!response?.didCancel) {
          console.log(response.assets[0].uri);
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const uploadImage = () => {
    if (loading) {
      return
    }

    setLoading(true)
    if (!image) {
      alert("Lütfen fotoğraf ekleyiniz.")
      setLoading(false)
    } else {
      const date = new Date().toString()
      storage().ref('Questions/' + date).putFile(image).then(async () => {
        const token = await AsyncStorage.getItem('token')
        const url = await storage().ref('Questions/' + date).getDownloadURL();
        firestore()
          .collection('Questions')
          .add({
            userId: token,
            image: url,
            answers: [],
          })
          .then(async (res) => {
            console.log()
            firestore()
              .collection('Questions').doc(res._documentPath._parts[1])
              .update({

                id: res._documentPath._parts[1]
              })
              .then(async () => {
                props.navigation.goBack()
                setLoading(false)
              })

          }).catch(err => {
            console.log(err)
            alert('Bilinmeyen bir hata oluştu.')
            setLoading(false)
          })
      })
    }

  };

  return (
    <Container>
      <Content style={styles.wr}>
        <SubHeader text={'Soru Sor'} />
        <View style={styles.photoWr}>
          {!image ? <Text>Görüntülemek için fotoğraf yükleyiniz!</Text> : <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <Button text={'Galeriden Yükle'} buttonStyle={styles.button} onPress={selectImage} />
        <Button text={'Fotoğraf Çek'} buttonStyle={styles.button} onPress={selectImageCamera} />
        <Button text={'Soruyu Gönder'} buttonStyle={styles.button} onPress={uploadImage} loading={loading} />
      </Content>
    </Container>
  );
};
