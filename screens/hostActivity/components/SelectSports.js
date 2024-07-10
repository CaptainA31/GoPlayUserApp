import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../GlobalStyles';
import {webURL} from '../../../services/BaseURL';
import {getAllSports} from '../../../services/signin';
// import {useDispatch, useSelector} from 'react-redux';
import Invites from './Invites';

const SelectSports = ({selectedSport, setSelectedSport}) => {
  const [sports, setSports] = useState([{name: '', logo: ''}]);
  
  // Dummy reduxSports data
  const reduxSports = [
    {name: 'Football', logo: '/images/football.png'},
    {name: 'Basketball', logo: '/images/basketball.png'},
    // Add more dummy sports data as needed
  ];

  useEffect(() => {
    getAllSports().then(res => {
      setSports(res.data.sports);
    });
  }, []);

  const handleSelection = item => {
    setSelectedSport(item);
  };

  const checkMultiple = item => {
    return selectedSport === item;
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: '5%',
        alignSelf: 'center',
        width: '80%',
      }}>
      <FlatList
        data={sports}
        numColumns={2}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{height: RFValue(120), width: '50%'}}>
            <TouchableOpacity
              onPress={() => handleSelection(item)}
              style={styles.cardLogo}>
              <View
                style={[
                  styles.ballCircle,
                  {
                    borderColor: checkMultiple(item) ? 'white' : colors.grey,
                    backgroundColor: checkMultiple(item) ? '#38B000' : null,
                  },
                ]}>
                <Image
                  source={{uri: `${webURL}${item.logo}`}}
                  style={{
                    width: '60%',
                    height: '70%',
                    resizeMode: 'contain',
                    tintColor: checkMultiple(item) ? 'white' : colors.grey,
                  }}
                />
                <Text
                  style={{
                    color: checkMultiple(item) ? colors.white : colors.grey,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SelectSports;

const styles = StyleSheet.create({
  ballCircle: {
    height: RFValue(90),
    width: RFValue(90),
    borderRadius: 20,
    borderColor: colors.light,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: RFValue(5),
  },
  cardLogo: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
