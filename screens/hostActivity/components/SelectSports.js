import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../../GlobalStyles';
import { webURL } from '../../../services/BaseURL';
import { getAllSports } from '../../../services/signin';
// import { useDispatch, useSelector } from 'react-redux';
import Invites from './Invites';
import { ScrollView } from 'react-native-gesture-handler';

const SelectSports = ({ selectedSport, setSelectedSport }) => {
  const [sports, setSports] = useState([{ name: '', logo: '' }]);

  // Dummy reduxSports data
  const reduxSports = [
    { name: 'Football', logo: '/images/football.png' },
    { name: 'Basketball', logo: '/images/basketball.png' },
    // Add more dummy sports data as needed
  ];

  useEffect(() => {
    getAllSports().then(res => {
      setSports(res.data.sports);
    });
  }, []);

  const handleSelection = item => {
    if (selectedSport === item) {
      setSelectedSport(null); // Deselect if already selected
    } else {
      setSelectedSport(item); // Select if not already selected
    }
  };

  const isSelected = item => {
    return selectedSport === item;
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingTop: '5%', width: '100%' }}>
        <FlatList
          data={sports}
          numColumns={2}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ height: RFValue(120), width: '40%' }}>
              <TouchableOpacity onPress={() => handleSelection(item)} style={styles.cardLogo}>
                <View
                  style={[
                    styles.ballCircle,
                    {
                      borderColor: isSelected(item) ? '#38B000' : colors.grey,
                      // backgroundColor: isSelected(item) ? '#38B000' : 'white',
                    },
                  ]}
                >
                  <Image
                    source={{ uri: `${webURL}${item.logo}` }}
                    style={{
                      width: '60%',
                      height: '70%',
                      resizeMode: 'contain',
                      tintColor: isSelected(item) ? 'white' : colors.grey,
                    }}
                  />
                  <Text style={{ color: isSelected(item) ? colors.white : colors.grey }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default SelectSports;

const styles = StyleSheet.create({
  ballCircle: {
    height: RFValue(90),
    width: RFValue(90),
    borderRadius: 20,
    borderColor: colors.light,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: RFValue(5),
  },
  cardLogo: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
});
