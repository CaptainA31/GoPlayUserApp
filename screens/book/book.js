import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';
import trash from '../../assets/trash.png';
import edit from '../../assets/create.png';
import { RFValue } from 'react-native-responsive-fontsize';
import locationIcon from '../../assets/location_pin.png';
import phoneIcon from '../../assets/smartphone.png';
import noFacility from '../../assets/noFacility.png';
import Animated from 'react-native-reanimated';
import { webURL } from '../../services/BaseURL';
import {
  capitalizeFirstLetter,
  colors,
  imageStyle,
  stringReduce,
} from '../../GlobalStyles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { useFocusEffect } from '@react-navigation/core';
import MyTabBar from '../../components/MyTabBar';
import wallpaper from '../../assets/wallpaper.png';
import { getAllFacilities } from '../../services/Booking';
import FilterModal from './FilterModal';
import { getAllSports } from '../../services/signin';
import Star from 'react-native-star-view';

const starStyle = {
  width: 80,
  height: 20,
  marginTop: '4%',
};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Book = ({ navigation, drawerAnimationStyle }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [myFacilities, setMyFacility] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);

  const onBack = () => {
    navigation.navigate('HOME');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllFacilities().then(res => setMyFacility(res.data.facilities));
      return () => null;
    }, [navigation]),
  );

  useEffect(() => {
    getAllSports().then(res => setSports(res.data.sports));
  }, []);

  const handleSearchLocation = name => {
    if (selectedSport) {
      if (name) {
        const filterOut = myFacilities.filter(element =>
          element.location.name.toLowerCase().includes(name.toLowerCase()),
        );
        const filterSports = filterOut.filter(item => {
          let sportexist = item.availableSport.find(
            element => element._id == selectedSport,
          );
          if (sportexist) {
            return true;
          } else {
            return false;
          }
        });

        setMyFacility(filterSports);
      } else {
        const onlySports = myFacilities.filter(item => {
          let sportexist = item.availableSport.find(
            element => element._id == selectedSport,
          );
          if (sportexist) {
            return true;
          } else {
            return false;
          }
        });
        setMyFacility(onlySports);
      }
      setModalVisible(false);
      return;
    }
    if (name) {
      setModalVisible(false);
      const filterOut = myFacilities.filter(element =>
        element.location.name.toLowerCase().includes(name.toLowerCase()),
      );
      setMyFacility(filterOut);
    } else {
      getAllFacilities().then(res => setMyFacility(res.data.facilities));
    }
    setModalVisible(false);
  };

  const handleSelection = item => {
    if (item == selectedSport) {
      setSelectedSport(null);
    } else {
      setSelectedSport(item);
    }
  };

  const handleMultiple = item => {
    if (selectedSport == item) {
      return true;
    } else {
      return false;
    }
  };

  const clearAllFilter = () => {
    setSelectedSport(null);
    setSearchLocation(null);
    setModalVisible(false);
    getAllFacilities().then(res => setMyFacility(res.data.facilities));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Animated.View
        style={{
          flex: 1,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
        <Header
          onBack={onBack}
          heading={'Booking'}
          text={'Filters'}
          onTextPress={() => setModalVisible(true)}
        />

        <FilterModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          location={searchLocation}
          handleSearchLocation={handleSearchLocation}
          setLocation={setSearchLocation}
          handleMultiple={handleMultiple}
          handleSelection={handleSelection}
          sports={sports}
          clearAllFilter={clearAllFilter}
        />

        <ImageBackground
          imageStyle={{ width: '100%', height: '100%' }}
          source={wallpaper}
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: '4%',
          }}>
          {myFacilities.length >= 1 ? (
            <SwipeListView
              data={myFacilities}
              contentContainerStyle={{ paddingBottom: 30 }}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              initialNumToRender={10}
              leftOpenValue={0}
              rightOpenValue={0}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.facilites}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('bookDetail', { facility: item })
                      }
                      style={styles.facImage}>
                      <View style={{ flexDirection: 'row' }}>
                        <ImageBackground
                          source={{ uri: `${webURL}${item.coverPhoto}` }}
                          style={{
                            width: '50%',
                            height: '100%',
                            justifyContent: 'flex-end',
                            backgroundColor: colors.lightGreen2,
                            borderRadius: RFValue(5),
                          }}>
                          <View
                            style={{ height: '100%', justifyContent: 'flex-end' }}>
                            <View
                              style={{
                                height: '100%',
                                justifyContent: 'flex-end',
                              }}></View>
                          </View>
                        </ImageBackground>
                        <View
                          style={{
                            width: '50%',
                            flexDirection: 'column',
                            paddingLeft: RFValue(5),
                          }}>
                          <Text numberOfLines={1} style={styles.facTitle}>
                            {' '}
                            {capitalizeFirstLetter(item.name)}
                          </Text>
                          <Star
                            score={item.rating ? item.rating : 0}
                            style={starStyle}
                          />

                          {item?.startingFrom && (
                            <Text
                              style={{
                                fontSize: RFValue(26),
                                marginTop: '1%',
                                color: colors.light,
                                fontFamily: 'Poppins-Regular',
                                bottom: RFValue(-5),
                              }}>
                              {item?.startingFrom} <Text>PKR</Text>
                            </Text>
                          )}
                          {item?.startingFrom && (
                            <Text
                              style={{
                                color: 'grey',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Starting Price
                            </Text>
                          )}
                        </View>
                      </View>
                    </Pressable>
                    <View
                      style={{
                        height: '45%',
                        paddingHorizontal: '2%',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{ marginTop: '1%', height: '100%', width: '90%' }}>
                        <View style={{ flexDirection: 'row', marginTop: '1%' }}>
                          <View
                            style={{
                              width: RFValue(14),
                              height: RFValue(15),
                              marginRight: '2%',
                              top: '1%',
                            }}>
                            <Image source={locationIcon} style={imageStyle} />
                          </View>
                          <Text style={{ fontSize: RFValue(12) }}>
                            {stringReduce(item.location.name, 30)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: '3%',
                          }}>
                          <View
                            style={{ flexDirection: 'row', marginRight: '20%' }}>
                            <View
                              style={{
                                width: RFValue(14),
                                height: RFValue(15),
                                marginRight: '2%',
                                top: '1%',
                              }}>
                              <Image
                                source={phoneIcon}
                                style={[imageStyle, { tintColor: colors.light }]}
                              />
                            </View>
                            <Text>{item.phone}</Text>
                          </View>
                          <FlatList
                            horizontal
                            data={item.availableSport}
                            contentContainerStyle={{
                              paddingRight: RFValue(20),
                            }}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                              return (
                                <View style={styles.circle}>
                                  <Image
                                    source={{ uri: `${webURL}${item.logo}` }}
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
                        </View>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() =>
                            navigation.navigate('bookAsActivity', {
                              facility: item,
                            })
                          }>
                          <LinearGradient
                            colors={[colors.lightGreen2, colors.lightGreen2]}
                            style={[
                              styles.button,
                              { width: '100%', height: '100%' },
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                            <Text
                              style={{
                                color: colors.light,
                                fontSize: RFValue(14),
                                fontFamily: 'Poppins-Bold',
                              }}>
                              Book Now
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                      <View></View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View style={styles.noBookingContainer}>
              <Pressable
                onPress={() => navigation.navigate('AddFacility')}
                style={[
                  styles.noBooking,
                  { height: RFValue(130), marginBottom: '10%' },
                ]}>
                <Image
                  style={{ resizeMode: 'contain', width: '90%', height: '90%' }}
                  source={noFacility}
                />
              </Pressable>
            </View>
          )}
        </ImageBackground>
        <View style={{ height: '8%', backgroundColor: 'white' }}>
          <MyTabBar navigation={navigation} currentTab="BOOK" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Book;

const styles = StyleSheet.create({
  facilites: {
    width: '100%',
    marginTop: RFValue(15),
    backgroundColor: 'white',
    overflow: 'hidden',
    height: RFValue(260),
    borderRadius: RFValue(10),
    shadowColor: '#000',
    borderColor: 'lightgrey',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 4,
  },
  facImage: {
    height: '55%',
    width: '100%',
    padding: '2%',
  },

  hiddenItem: {
    width: '100%',
    height: RFValue(190),
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingRight: '10%',
    paddingVertical: '10%',
  },
  logo: {
    width: RFValue(20),
    height: RFValue(20),
    resizeMode: 'contain',
  },
  facTitle: {
    fontSize: RFValue(16),
    fontFamily: 'Poppins-Regular',
    bottom: RFValue(-5),
  },
  noBooking: {
    height: RFValue(100),
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 4,
  },
  noBookingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    height: '35%',
    width: '80%',
    borderRadius: RFValue(44),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
});
