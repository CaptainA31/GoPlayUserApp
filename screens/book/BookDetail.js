import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Pressable,
  ScrollView,
  ColorPropType,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import Header from '../../components/Header';
import football from '../../assets/upload.png';
import {colors} from '../../GlobalStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import icon from '../../assets/location.png';
import camera from '../../assets/create.png';
import locationIcon from '../../assets/direction.png';
import smartphone from '../../assets/smartphone.png';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/email.png';
import instagram from '../../assets/instagram.png';
import {TimePickerModal, DatePickerModal} from 'react-native-paper-dates';
import SelectableChips from 'react-native-chip/SelectableChips';
import ball from '../../assets/cricket.png';
import Button from '../../components/Button';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import {webURL} from '../../services/BaseURL';
import SportsModal from '../../components/SportsModal';
import {launchImageLibrary} from 'react-native-image-picker';
import MessageModal from '../../components/MessageModal';
import {ActivityIndicator} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useFocusEffect} from '@react-navigation/core';
import {getAllSports} from '../../services/signin';
import Star from 'react-native-star-view';
import wallpaper from '../../assets/wallpaper.png';

const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const BookDetail = ({navigation, route}) => {
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [tenureStartOpen, setTenureStartOpen] = useState(false);
  const [tenureEndOpen, setTenureEndOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
  });
  const [day, setDay] = useState('Select Day');
  const [startTime, setStartTime] = useState('Start time');
  const [endTime, setEndTime] = useState('End time');
  const [venueTimings, setVenueTimings] = useState([]);
  const [tenureStart, setTenureStart] = useState('Start Date');
  const [tenureEnd, setTenureEnd] = useState('End Date');
  const [venueFacility, setVenueFacility] = useState([]);
  const [sports, setSports] = useState([{name: '', logo: ''}]);
  const [availableSports, setAvailableSport] = useState([]);
  const [sportsModal, setSportsModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [terms, setTerms] = useState();
  const [loading, setLoading] = useState(false);

  const starStyle = {
    width: 100,
    height: 20,
    marginBottom: 2,
  };

  useFocusEffect(
    React.useCallback(() => {
      const {facility} = route.params;
      console.log(facility);
      setCoverPhoto(facility.coverPhoto);
      setName(facility.name);
      setLocation(facility.location);
      setPhone(facility.phone);
      setSocialLinks(facility.socialLinks);
      setVenueTimings(facility.venueTimings);
      setTenureStart(facility.contractTenure.from);
      setTenureEnd(facility.contractTenure.to);
      setVenueFacility(facility.venueFacility);
      setSelectedSport(facility.availableSport);
      setRating(facility.rating);
      setTerms(facility.terms);

      return () => null;
    }, [navigation]),
  );

  const handleSelection = item => {
    let array = selectedSport.find(current => current.name == item.name);
    if (array) {
      let data = selectedSport.filter(current => current.name !== item.name);
      return setSelectedSport(data);
    }
    setSelectedSport([...selectedSport, item]);
  };

  const checkMultiple = item => {
    if (selectedSport.length == 0) {
      return false;
    } else {
      let data = selectedSport.find(element => element.name == item.name);
      if (data) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleCover = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.5,
      },
      event => {
        if (!event.didCancel) {
          let image = event.assets[0].base64;
          setCoverPhoto(`data:image/png;base64,${image}`);
        }
      },
    );
  };

  const handleSave = () => {
    if (coverPhoto == null) {
      setLoading(false);
      Alert.alert('Cover photo not found', 'please add photo to proceed', [
        {
          text: 'Back',
          style: 'destructive',
          onPress: () => {},
        },
      ]);
      return;
    }
    if (selectedSport.length < 1) {
      setLoading(false);
      Alert.alert('Sports not found', 'please add sports to proceed', [
        {
          text: 'Back',
          style: 'destructive',
          onPress: () => {},
        },
      ]);
      return;
    }
    setLoading(true);
    let Arr = [];
    selectedSport.forEach(element => {
      Arr.push(element._id);
    });
    let data = {
      id: route.params.facility._id,
      name: name.toLowerCase(),
      coverPhoto: coverPhoto,
      location: {
        name: location,
      },
      phone: phone,
      socialLinks: socialLinks,
      venueTimings: venueTimings,
      contractTenure: {
        from: tenureStart,
        to: tenureEnd,
      },
      venueFacility: venueFacility,
      availableSport: Arr,
    };

    EditNewFacility(data).then(res => {
      setModalVisible(true);
      setMessage(res.data.message);
      setLoading(false);
    });
  };

  const handleSocialLinks = (value, key) => {
    setSocialLinks({...socialLinks, [key]: value});
  };

  useEffect(() => {
    getAllSports().then(res => setSports(res.data.sports));
  }, []);

  //Date Part
  const onDismissStart = React.useCallback(() => {
    setStartTimeVisible(false);
  }, [setStartTimeVisible]);

  const onConfirmStart = date => {
    setStartTimeVisible(false);
    let time = moment(date).format('hh:mm A');
    setStartTime(time);
  };

  const handeVenuTimings = () => {
    if (startTime !== 'Start time' && endTime !== 'End time') {
      let object = {
        day: day,
        startTime: startTime,
        endTime: endTime,
      };
      setVenueTimings([...venueTimings, object]);
    } else {
      alert('Please select time first');
    }
  };

  const onDismissEnd = React.useCallback(() => {
    setEndTimeVisible(false);
  }, [setEndTimeVisible]);

  const onConfirmEnd = date => {
    setEndTimeVisible(false);
    let time = moment(date).format('hh:mm A');
    setEndTime(time);
  };

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onTenureStartDismiss = React.useCallback(() => {
    setTenureStartOpen(false);
  }, [setTenureStartOpen]);

  const onTenureConfirmStart = React.useCallback(
    params => {
      setTenureStartOpen(false);
      let tempDate = moment(params).format('MM-DD-YYYY');
      setTenureStart(tempDate);
    },
    [setTenureStartOpen],
  );

  const onTenureEndDismiss = React.useCallback(() => {
    setTenureEndOpen(false);
  }, [setTenureEndOpen]);

  const onTenureConfirmEnd = React.useCallback(
    params => {
      setTenureEndOpen(false);
      let tempDate = moment(params).format('MM-DD-YYYY');
      setTenureEnd(tempDate);
    },
    [setTenureEndOpen],
  );
  // Date Part

  const checkMultipleChips = item => {
    if (venueFacility.length == 0) {
      return false;
    } else {
      let data = venueFacility.find(element => element == item);
      if (data) {
        return true;
      } else {
        return false;
      }
    }
  };
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChips = item => {
    let array = venueFacility.find(current => current == item);
    if (array) {
      let data = venueFacility.filter(current => current !== item);
      return setVenueFacility(data);
    }
    setVenueFacility([...venueFacility, item]);
  };

  const handleLocation = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${location?.lat},${location?.long}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={wallpaper}
      imageStyle={{width: '100%', height: '100%', resizeMode: 'cover'}}
      style={{height: '100%', backgroundColor: 'white'}}>
      <DateTimePickerModal
        isVisible={startTimeVisible}
        onCancel={onDismissStart}
        onConfirm={onConfirmStart}
        mode={'time'}
      />
      <DateTimePickerModal
        isVisible={endTimeVisible}
        onCancel={onDismissEnd}
        onConfirm={onConfirmEnd}
        mode={'time'}
      />

      <DateTimePickerModal
        // locale={'en'} optional, default: automatic
        mode={'date'}
        isVisible={tenureStartOpen}
        onCancel={onTenureStartDismiss}
        date={date}
        onConfirm={onTenureConfirmStart}
      />

      <DateTimePickerModal
        // locale={'en'} optional, default: automatic
        mode={'date'}
        isVisible={tenureEndOpen}
        onCancel={onTenureEndDismiss}
        date={date}
        onConfirm={onTenureConfirmEnd}
      />
      <Header
        heading={'View Facility'}
        onBack={() => navigation.navigate('Home')}
      />

      <View style={styles.facImage}>
        <ImageBackground
          source={
            coverPhoto.length < 500
              ? {uri: `${webURL}${coverPhoto}`}
              : {uri: coverPhoto}
          }
          resizeMode={coverPhoto ? 'cover' : 'center'}
          //  imageStyle = {coverPhoto ?null : {tintColor : colors.light}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'flex-end',
          }}></ImageBackground>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{height: '70%', paddingVertical: '2%', paddingHorizontal: '3%'}}>
        <View
          style={{
            borderColor: 'lightgrey',
            borderBottomWidth: 1,
            flexDirection: 'row',
          }}>
          {/* <View style = {styles.heading}>
                <Text style = {{fontSize : RFValue(18), fontWeight : "bold" , color : colors.light}}>{name}</Text>
             </View> */}
          <View
            style={{
              width: '80%',
              paddingVertical: '3%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'Poppins-Bold',
                // fontWeight: 'bold',
                color: colors.light,
              }}>
              {capitalizeFirstLetter(name)}
            </Text>
            <Star score={rating ? rating : 0} style={starStyle} />
            <Text
              style={{
                // fontWeight: 'bold',
                fontSize: RFValue(14),
                fontFamily: 'Poppins-Bold',
              }}>
              Ground Description
            </Text>
            <Text
              numberOfLines={1}
              style={{fontSize: RFValue(12), fontFamily: 'Poppins-Regular'}}>
              {location.name}
            </Text>
          </View>
          <View
            style={{
              width: '20%',
              alignItems: 'flex-end',
              paddingTop: '4%',
            }}>
            <TouchableOpacity onPress={handleLocation}>
              <Image
                source={locationIcon}
                style={{width: 35, height: 35, tintColor: 'green'}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingVertical: '3%'}}>
          <Text style={styles.h1}>Ground Facilities</Text>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {venueFacility.length > 0 ? (
            // venueFacility.map((item , index)=> {
            //   return (
            //            <View
            //         onPress={()=>handleSelection(item)}
            //       style = { styles.selected} >
            //           <Image source={{ uri : `${webURL}${item.logo}`}}
            //            style= {{resizeMode : "contain",marginRight:5 , tintColor : "white"  , width : 16 , height : 16}} />
            //           <Text style = {{color :  "white" , fontSize : RFValue(12) }}>{item.name}</Text>
            //       </View>
            //   )
            // })
            <FlatList
              data={venueFacility}
              numColumns={3}
              keyExtractor={item => item}
              renderItem={({item, index}) => {
                return (
                  <View
                    // onPress={()=>handleSelection(item)}
                    style={styles.selected}>
                    <Image
                      source={{uri: `${webURL}${item.logo}`}}
                      style={{
                        resizeMode: 'contain',
                        marginRight: 5,
                        tintColor: 'white',
                        width: 16,
                        height: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: RFValue(10),
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            borderColor: 'lightgrey',
            borderBottomWidth: 1,
            flexDirection: 'row',
          }}></View>

        <View style={{paddingVertical: 12}}>
          <Text style={styles.h1}>Contact Details</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{width: 20, height: 20}}>
            <Image
              source={smartphone}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                tintColor: colors.light,
              }}
            />
          </View>
          <Text style={{marginLeft: 5, fontFamily: 'Poppins-Regular'}}>
            {phone}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{width: 20, height: 20}}>
            <Image
              source={twitter}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                tintColor: colors.light,
              }}
            />
          </View>
          <Text style={{marginLeft: 5, fontFamily: 'Poppins-Regular'}}>
            {socialLinks.twitter ? socialLinks.twitter : 'N/A'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{width: 20, height: 20}}>
            <Image
              source={facebook}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                tintColor: colors.light,
              }}
            />
          </View>

          <Text style={{marginLeft: 5, fontFamily: 'Poppins-Regular'}}>
            {socialLinks?.facebook}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{width: 20, height: 20}}>
            <Image
              source={instagram}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                tintColor: colors.light,
              }}
            />
          </View>
          <Text style={{marginLeft: 5, fontFamily: 'Poppins-Regular'}}>
            {socialLinks.instagram ? socialLinks.instagram : 'N/A'}
          </Text>
        </View>
        <View
          style={{
            height: 20,
            borderBottomColor: 'lightgrey',
            justifyContent: 'center',
            borderBottomWidth: 1,
            marginBottom: 2,
          }}
        />

        <View
          style={{
            paddingVertical: '3%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.h1}>Available Sport</Text>
        </View>
        <MessageModal
          message={message}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        {selectedSport.length >= 1 ? (
          <FlatList
            horizontal
            data={selectedSport}
            contentContainerStyle={{marginTop: 2}}
            key={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.circle}>
                  <Image
                    source={{uri: `${webURL}${item.logo}`}}
                    style={{
                      width: '70%',
                      height: '70%',
                      tintColor: colors.light,
                    }}
                  />
                </View>
              );
            }}
          />
        ) : (
          <Text> Please add sports </Text>
        )}

        <View style={[styles.heading, {height: 20}]} />

        <View
          style={{
            paddingVertical: '3%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.h1}>Terms and Condtions</Text>
        </View>
        {terms ? <Text>{terms}</Text> : <Text>No terms and conditions</Text>}

        <View style={styles.heading}>
          <Text style={{fontSize: RFValue(16), fontFamily: 'Poppins-Bold'}}>
            Venue Timings
          </Text>
        </View>
        {venueTimings.length >= 1 ? (
          <FlatList
            data={venueTimings}
            nestedScrollEnabled={true}
            contentContainerStyle={{paddingBottom: 15}}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.venueDetail}>
                  <Text
                    style={{
                      color: colors.light,
                      fontSize: RFValue(14),
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {capitalizeFirstLetter(item.day)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                    }}>
                    <View style={styles.verticalDivider} />
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: '5%',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontFamily: 'Poppins-Regular'}}>
                        {item.startTime}{' '}
                      </Text>
                      <View style={styles.divider} />
                      <Text style={{fontFamily: 'Poppins-Regular'}}>
                        {item.endTime}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : null}

        <View style={{height: 30}}></View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: 65,
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('bookAsActivity', {
              facility: route.params.facility,
            })
          }
          style={{height: '75%'}}>
          <Button text={'Book Now'}/>
        </TouchableOpacity>
      </View>

      <SportsModal
        handleSelection={handleSelection}
        checkMultiple={checkMultiple}
        modalVisible={sportsModal}
        setModalVisible={setSportsModal}
        sports={sports}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  facImage: {
    height: '27%',
    width: '100%',
    marginTop: '-7%',
  },
  button: {
    top: '8%',
    backgroundColor: '#ffffff8a',
    margin: RFValue(4),
    marginRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '25%',
    paddingVertical: '2%',
    borderRadius: 7,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: '15%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    bottom: '10%',
    tintColor: colors.light,
  },
  iconImageChange: {
    width: RFValue(15),
    height: RFValue(15),
    resizeMode: 'contain',
    // bottom : "10%",
    tintColor: colors.light,
  },
  h1: {
    // fontWeight: 'bold',
    fontSize: RFValue(17),
    fontFamily: 'Poppins-Bold',
  },
  picker: {
    width: '30%',
  },

  addButton: {
    flexDirection: 'row',

    height: RFValue(50),
    width: '100%',
    borderColor: colors.light,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: 'grey',
    width: 10,
    height: 3,
    alignSelf: 'center',
    // marginHorizontal : "4%"
  },
  dropDown: {
    height: RFValue(50),
    width: '30%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballCircle: {
    height: RFValue(50),
    width: RFValue(50),
    borderRadius: 100,
    borderColor: colors.light,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  venueDetail: {
    marginTop: 3,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    height: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    alignItems: 'center',
  },
  notSelected: {
    borderRadius: RFValue(14),
    backgroundColor: '#63636340',
    width: '30%',
    marginRight: '2%',
    marginBottom: RFValue(7),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
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
  heading: {
    height: 50,
    borderBottomColor: 'lightgrey',
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginBottom: 2,
  },
  verticalDivider: {
    height: RFValue(20),
    width: 2,
    marginRight: 10,
    backgroundColor: 'black',
  },
  circle: {
    width: RFValue(25),
    height: RFValue(25),
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookDetail;
