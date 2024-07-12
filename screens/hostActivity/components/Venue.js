import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  capitalizeFirstLetter,
  colors,
  imageStyle,
  stringReduce,
} from '../../../GlobalStyles';
import locationIcon from '../../../assets/location.png';
import Button from '../../../components/Button';
import SelectableChips from 'react-native-chip/SelectableChips';
import {
  getAllVenueFacilities,
  venueFacilityData,
} from '../../../services/signin';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PlacePicker from './PlacePicker';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {webURL} from '../../../services/BaseURL';

const Venue = ({
  location,
  setLocation,
  handleSelection,
  checkMultiple,
  activityName,
  additionalInfo,
  setAdditionalInfo,
  setActivityName,
  setModalVisible,
}) => {
  const [venueFacility, setVenueFacility] = useState([]);

  const handleLocation = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    getAllVenueFacilities().then(res => {
      setVenueFacility(res.data.venueFacilities);
    });
  }, []);

  return (
    <View style={{height: '100%', paddingHorizontal: '3%', zIndex: 0}}>
      <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: 'Poppins-Bold',
          marginBottom: '1%',
          fontWeight: "bold"
        }}>
        Activity Name
      </Text>

      <View
        style={{
          borderRadius: RFValue(8),
          height: RFValue(45),
          borderColor: '#D8DADC',
          borderWidth: 1,
        }}>
        <TextInput
          onChangeText={event => setActivityName(event)}
          maxLength={100}
          value={activityName}
          multiline
          placeholder='ABC'
          style={{
            width: '100%',
            color: '#181818',
            height: '100%',
            textAlignVertical: 'top',
            fontFamily: 'Poppins-Regular',
            padding: 12
          }}
        />
      </View>
      {/* <View style={{height: RFValue(45), marginTop: '2%'}}>
        <OutlinedTextField
          lineWidth={1}
          tintColor={colors.light}
          baseColor="#D8DADC"
          textColor="grey"
          value={activityName}
          containerStyle={{height: RFValue(45)}}
          inputContainerStyle={{
            paddingRight: '20%',
            height: RFValue(50),
          }}
          onChangeText={event => setActivityName(event)}
          label="Activity Name"
        />
      </View> */}

      <View style={{alignSelf: 'center', paddingVertical: '3%'}}></View>
      <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: 'Poppins-Bold',
          marginBottom: '1%',
          fontWeight: "bold"
        }}>
        Location
      </Text>

      <TouchableOpacity onPress={handleLocation} style={styles.dotButton}>
        <View />

        <View style={styles.locationIcon}>
          <Image source={locationIcon} style={imageStyle} />
        </View>
        {location ? (
          <Text
            style={{
              color: "#38B000",
              fontSize: RFValue(14),
              paddingHorizontal: '10%',
            }}>
            {stringReduce(location.name, 50)}
          </Text>
        ) : (
          <Text
            style={{
              position: 'relative',
              color: colors.grey,
              fontSize: RFValue(14),
              fontFamily: 'Poppins-Regular',
            }}>
            Search Location
          </Text>
        )}
        <View />
      </TouchableOpacity>

      {/* <SelectableChips 
        chipStyle = {{borderColor : colors.light}}
        initialChips={venueFacilityData} 
        onChangeChips={(chips) => setVenueFacility(chips)} alertRequired={false}
        valueStyle = {{fontSize : RFValue(14) , color : colors.light}}
        chipStyleSelected = {{backgroundColor : colors.light}}
        valueStyleSelected = {{color : "white"}}
        /> */}

      <View style={{marginVertical: '5%'}}>
        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: 'Poppins-Bold',
            marginBottom: '-4%',
          fontWeight: "bold"
          }}>
          Additional Info
        </Text>
      </View>

      <View style={styles.info}>
        <TextInput
          onChangeText={event => setAdditionalInfo(event)}
          maxLength={100}
          value={additionalInfo}
          multiline
          style={{
            width: '100%',
            color: '#181818',
            height: '100%',
            textAlignVertical: 'top',
            fontFamily: 'Poppins-Regular',
            padding: 12
          }}
        />
      </View>
      <Text style={{color: 'grey', fontFamily: 'Poppins-Regular'}}>
        Maximum limit 100 word
      </Text>

      <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: 'Poppins-Bold',
          marginBottom: '1%',
          fontWeight: "bold",
          marginTop: 15
        }}>
        Pitch Court
      </Text>

      <View
        style={{
          borderRadius: RFValue(8),
          height: RFValue(45),
          borderColor: '#D8DADC',
          borderWidth: 1,
        }}>
        <TextInput
          onChangeText={event => setActivityName(event)}
          maxLength={100}
          value={activityName}
          multiline
          placeholder='Dummy'
          style={{
            width: '100%',
            color: '#181818',
            height: '100%',
            textAlignVertical: 'top',
            fontFamily: 'Poppins-Regular',
            padding: 12
          }}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
            <FontAwesome name="question-circle" size={24} color="#38B000" />
          <Text style={{color: 'grey', fontFamily: 'Poppins-Regular', marginLeft: 10}}>
          please add details for the pitch?court to assist the players identify the pitch/court at venue. Example for football : 7X7 Pitch 1
          </Text>
      </View>

      <View style={{marginVertical: '3%'}}>
        <Text style={{fontSize: RFValue(14), fontFamily: 'Poppins-Bold',
          fontWeight: "bold"}}>
          Venue Facilities
        </Text>
      </View>

      {venueFacility.length > 0 && (
        <FlatList
          style={{width: '100%', marginBottom: RFValue(25)}}
          data={venueFacility}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleSelection(item)}
                style={
                  checkMultiple(item) ? styles.selected : styles.notSelected
                }>
                <Image
                  source={{uri: `${webURL}${item.logo}`}}
                  style={{
                    resizeMode: 'contain',
                    marginRight: 5,
                    tintColor: checkMultiple(item) ? 'white' : 'black',
                    width: RFValue(15),
                    height: RFValue(15),
                  }}
                />
                <Text
                  style={{
                    color: checkMultiple(item) ? 'white' : 'black',
                    fontSize: RFValue(11),
                  }}>
                  {capitalizeFirstLetter(item.name)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default Venue;

const styles = StyleSheet.create({
  dotButton: {
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dotted',
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationIcon: {
    position: 'absolute',
    right: '5%',
    width: RFValue(16),
    height: RFValue(16),
  },
  notSelected: {
    borderRadius: RFValue(14),
    backgroundColor: '#f1f1f1',
    width: '32%',
    paddingHorizontal: '5%',
    marginRight: '2%',
    marginBottom: RFValue(7),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selected: {
    borderRadius: RFValue(14),
    backgroundColor: colors.light,
    width: '32%',
    paddingHorizontal: '5%',
    marginRight: '2%',
    marginBottom: RFValue(7),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info: {
    borderRadius: RFValue(5),
    height: RFValue(110),
    borderColor: '#D8DADC',
    borderWidth: 1,
  },
});
