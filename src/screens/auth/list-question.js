import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, AsyncStorage, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height, COLORS } from '../../constants';
import { SubHeader, Button } from '../../components';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'native-base'
const styles = StyleSheet.create({
  wr: {
    width: width,
    height: height,
  },
  headerWr: {
    width: width,
    paddingHorizontal: width * 0.1,
  },
  flatList: {
    paddingVertical: height * 0.02,
  },
  itemWr: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',

  },
  photoWr: {
    width: width * 0.9,
    height: height * 0.55,
    marginTop: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 15, overflow: 'hidden'
  },
  image: { width: width * 0.9, height: height * 0.5, },
  buttonWr: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.PRIMARY
  },
  button: {
    width: width * 0.45,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
    height: height * 0.4,
  },
  cross: {
    position: 'absolute',
    top: 5,
    right: 5
  },

  answerButton: { width: width * 0.7, marginVertical: height * 0.025, marginHorizontal: width * 0.1 },
});

export const ListQuestionScreen = props => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    firestore()
      .collection('Questions')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let data = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          data.push(documentSnapshot.data())
        });
        console.log(data)
        setData(data)
      });
  }
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
          addImage(response.assets[0].uri);
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
          addImage(response.assets[0].uri);
        }
      },
    );
  };

  const addImage = (image) => {
    const date = new Date().toString()
    storage().ref('Answers/' + date).putFile(image).then(async () => {
      const url = await storage().ref('Answers/' + date).getDownloadURL();
      firestore()
        .collection('Questions').doc(selectedItem.id)
        .update({
          answers: [...selectedItem.answers, url]
        })
        .then(async () => {
          setAnswerModalVisible(false)
          getData()
        }).catch(err => {
          console.log(err)
          alert('Bilinmeyen bir hata oluştu.')
        })
    })
  }
  const renderItem = ({ item, index }) => (
    <View style={styles.itemWr}>
      <View style={styles.photoWr}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.buttonWr}>
          <TouchableOpacity style={styles.button} onPress={() => {
            if (item.answers.length > 0) {
              props.navigation.navigate('ListAnswerScreen', { questionId: item.id })
            } else { alert('Soru için henüz cevap girilmemiştir.') }
          }}>
            <Text style={styles.buttonText}>Cevapları Gör ({item.answers.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setSelectedItem(item)
            setAnswerModalVisible(true)
          }}>
            <Text style={styles.buttonText}>Cevapla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      <Content style={styles.wr}>
        <FlatList
          ListHeaderComponent={() =>
            <View style={styles.headerWr}>
              <SubHeader text={'Sorular'} />
            </View>
          }
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList} />
        <View style={styles.centered}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={answerModalVisible}

          >
            <View style={styles.centered}>
              <View style={styles.modalView}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                  <Button text={'Galeriden Yükle'} buttonStyle={styles.answerButton} onPress={selectImage} />
                  <Button text={'Fotoğraf Çek'} buttonStyle={styles.answerButton} onPress={selectImageCamera} />
                </View>

                <TouchableOpacity style={styles.cross} onPress={() => setAnswerModalVisible(false)}>
                  <Icon type="AntDesign" name="close" />
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

        </View>
      </Content>
    </Container>
  );
};
