import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import { width, height, } from '../../constants';
import { InfoItem, Social, SubHeader } from '../../components';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    padding: width * 0.05,
  },
  itemWr: {
    width: width * 0.9,
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: { marginVertical: 15 },
});

export const InfoScreen = props => {
  const infoItems = [
    {
      text: 'Mail',
      value: 'info@sorbakalim.com'
    },
    {
      text: 'Telefon',
      value: '0 555 55 55'
    },
  ];
  return (
    <Container>
      <Content style={styles.wr}>
        <SubHeader text={'Bize Ulaşın'} />
        <View style={styles.itemWr}>
          {infoItems.map((item, index) => {
            return (
              <InfoItem
                index={index}
                item={item}
                itemWrStyle={styles.itemStyle}
              />
            );
          })}
        </View>

        <Social />
      </Content>
    </Container>
  );
};
