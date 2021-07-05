import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, AsyncStorage, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height, COLORS } from '../../constants';
import { SubHeader } from '../../components';
import firestore from '@react-native-firebase/firestore';
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
    height: height * 0.5,
    marginTop: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 15, overflow: 'hidden'
  },
  image: { width: width * 0.9, height: height * 0.5, },


});

export const ListAnswerScreen = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData()
  }, [props.route.params.questionId]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    firestore()
      .collection('Questions').doc(props.route.params.questionId)
      .get().then(documentSnapshot => {
        setData(documentSnapshot.data().answers)
      });

  }

  const renderItem = ({ item, index }) => (
    <View style={styles.itemWr}>
      <View style={styles.photoWr}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    </View>
  );

  return (
    <Container>
      <Content style={styles.wr}>
        <FlatList
          ListHeaderComponent={() =>
            <View style={styles.headerWr}>
              <SubHeader text={'Cevaplar'} />
            </View>
          }
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList} />

      </Content>
    </Container>
  );
};
