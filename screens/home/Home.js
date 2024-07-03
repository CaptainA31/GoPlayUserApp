import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Pressable,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors, imageStyle, screen } from '../../GlobalStyles';
import avatar from '../../assets/avatar.png';
import messages from '../../assets/messages.png';
import wallpaper from '../../assets/wallpaper.png';
import play from '../../assets/basketball.png';
import player from '../../assets/player.png';
import book from '../../assets/stadium.png';
import activity from '../../assets/activity.png';
import groups from '../../assets/groups.png';
import offer from '../../assets/offers.png';
import community from '../../assets/community.png';
import leaderboardIcon from '../../assets/leaderboard.png';
import coach from '../../assets/treadmil.png';
import MyTabBar from '../../components/MyTabBar';
import BookingGames from '../../components/BooingGames';
import Games from '../../components/Games';
import lion from '../../assets/lion-bg.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserDetail } from '../../services/userService';
// import { fetchUser, setUserDetail } from '../../redux/userSlice';
// import { fetchFacility } from '../../redux/facilitySlice';
// import { getHostActivity } from '../../services/HostActivity';
// import { fetchMyGames } from '../../redux/myGamesSlice';
// import { fetchPlayNow } from '../../redux/playNowSlice';
// import { useFocusEffect } from '@react-navigation/core';
// import { fetchMyInvites } from '../../redux/invitedSlice';
// import { getAllOffers, getBanners } from '../../services/Offers';
// import OfferComponent from '../../components/Offers';
import Swiper from 'react-native-swiper';
// import {
//   NotificationListener,
//   requestUserPermission,
// } from '../../services/notificationService';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ drawerAnimationStyle, navigation }) => {
  const [userDetail, setUserDetail] = useState({
    firstName: "John",
    lastName: "Doe",
  });
  const [myGameList, setMyGameList] = useState({
    myGamesList: [],
    loading: false,
  });
  const [offers, setOffers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const cardData = [
    { title: 'Host Activity', icon: activity, navigation: 'hostActivity' },
    { title: 'Groups', icon: groups, navigation: 'groups' },
    { title: 'Offers', icon: offer, navigation: 'offers' },
    { title: 'Community', icon: community, navigation: 'community' },
    { title: 'LeaderBoard', icon: leaderboardIcon, navigation: 'leaderBoard' },
  ];

  const playData = [
    {
      title: 'Play',
      subtitle: 'with players nearby',
      icon: play,
      navigate: () => {
        navigation.navigate('PLAY');
      },
    },
    {
      title: 'Book',
      subtitle: 'sports venue and sessions',
      icon: book,
      navigate: () => {
        navigation.navigate('BOOK');
      },
    },
    {
      title: 'Train',
      subtitle: 'with academics and certified coaches',
      icon: coach,
      navigate: () => {
        navigation.navigate('train');
      },
    },
  ];

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={[screen,
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }]
    } // {...drawerAnimationStyle}
    >
      <View style={{ height: '22%' }}>
        <View
          style={{
            height: '100%',
            paddingTop: '7%',
            paddingHorizontal: '5%',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={avatar}
                style={{
                  width: RFValue(40),
                  height: RFValue(40),
                  borderRadius: RFValue(20),
                  marginRight: RFValue(10),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MESSAGES')}>
              <Image
                source={messages}
                style={{
                  height: RFValue(28),
                  width: RFValue(28),
                  tintColor: '#111',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userGreetingText}>
            Hi, {userDetail.firstName}
          </Text>
        </View>
      </View>
      <ImageBackground
        imageStyle={{ width: '100%', height: '100%' }}
        source={wallpaper}
        style={{ height: '70%', backgroundColor: 'white' }}>
        <View style={styles.headerCard}>
          {
            <FlatList
              data={cardData}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                alignItems: 'center',
                paddingLeft: '0.2%',
              }}
              keyExtractor={item => item.title}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(item.navigation);
                    }}
                    style={styles.menu}>
                    <Image
                      style={{
                        height: '100%',
                        width: RFValue(30),
                        resizeMode: 'contain',
                        tintColor: 'black',
                      }}
                      source={item.icon}
                    />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: RFValue(9),
                        fontFamily: 'Poppins-Bold',
                        marginLeft: RFValue(10),
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          }
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ paddingHorizontal: '4%' }}>
          <View style={{ marginTop: RFValue(0) }}>
            {myGameList.myGamesList?.length > 0 && (
              <View style={{ marginBottom: RFValue(10) }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '2%',
                  }}>
                  <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>
                    My Games/Bookings
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewAllGames')}>
                    <Text style={{ fontSize: RFValue(12), color: '#727272' }}>
                      View all
                    </Text>
                  </TouchableOpacity>
                </View>
                {!myGameList.loading ? (
                  myGameList.myGamesList?.length == 1 ? (
                    <View style={{ width: '100%' }}>
                      {myGameList.myGamesList[0].isBooking ? (
                        <BookingGames
                          navigation={navigation}
                          myGameList={myGameList.myGamesList[0]}
                          hide={true}
                        />
                      ) : (
                        <Games
                          navigation={navigation}
                          myGameList={myGameList.myGamesList[0]}
                          hide={true}
                        />
                      )}
                    </View>
                  ) : (
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={myGameList.myGamesList}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              width: Dimensions.get('window').width / 1.2,
                              marginRight: 10,
                            }}>
                            {item.isBooking ? (
                              <BookingGames
                                navigation={navigation}
                                myGameList={item}
                                hide={true}
                              />
                            ) : (
                              <Games
                                navigation={navigation}
                                myGameList={item}
                                hide={true}
                              />
                            )}
                          </View>
                        );
                      }}
                    />
                  )
                ) : null}
              </View>
            )}

            <ImageBackground
              source={lion}
              imageStyle={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%',
                marginLeft: -55,
                borderBottomLeftRadius: RFValue(8),
                borderTopLeftRadius: RFValue(8),
              }}
              style={{
                backgroundColor: '#00F5A0',
                height: RFValue(130),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: RFValue(7),
                borderRadius: RFValue(8),
                overflow: 'visible',
                marginTop: RFValue(20),
              }}>
                
              <View
                style={{
                  width: '60%',
                  paddingLeft: RFValue(10),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: RFValue(15),
                    fontFamily: 'Poppins-Regular',
                  }}>
                  All matches
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: RFValue(20),
                    fontFamily: 'Poppins-Bold',
                  }}>
                  PREMIERE LEAGUE
                </Text>
              </View>
              <Image
                source={player}
                style={{
                  width: '50%',
                  height: '110%',
                  resizeMode: 'contain',
                  marginBottom: RFValue(12),
                  zIndex: 1,
                }}
              />
            </ImageBackground>

            {playData.map((item, index) => {
              return (
                <Pressable onPress={item.navigate} key={item.subtitle}>
                  <ImageBackground
                    imageStyle={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    style={styles.card}>
                    <View
                      style={{
                        width: '45%',
                        justifyContent: 'center',
                        paddingLeft: '4%',
                        height: '100%',
                      }}>
                      <Text style={styles.h1}>{item.title}</Text>
                      <Text style={styles.h3}>{item.subtitle}</Text>
                    </View>
                    <View style={{ width: '60%', height: '100%' }}>
                      <Image source={item.icon} style={[imageStyle]} />
                    </View>
                  </ImageBackground>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
      <View style={{ height: '8%', backgroundColor: 'red' }}>
        <MyTabBar navigation={navigation} currentTab="HOME" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: 'green',
    width: '100%',
    height: 250,
  },
  circle: {
    height: RFValue(95),
    width: RFValue(95),
    borderRadius: 100,
    marginTop: '-5%',
    padding: '1%',
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
  },
  userGreetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(20),
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    marginRight: RFValue(10),
  },
  userGreetingText: {
    fontSize: RFValue(30),
    color: '#000',
    marginRight: RFValue(10),
    marginTop: RFValue(10),
    fontFamily: 'Poppins-Bold',
  },
  name: {
    alignSelf: 'center',
    fontSize: RFValue(16),
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  detail: {
    alignSelf: 'center',
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  divide: {
    width: '0.6%',
    marginHorizontal: '1%',
    marginRight: '2%',
    height: '100%',
    backgroundColor: 'white',
  },
  headerCard: {
    height: '12%',
    backgroundColor: 'white',
    marginHorizontal: '1%',
    paddingHorizontal: '1%',
    borderRadius: 10,
    bottom: '3%',
    marginTop: '-6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  menu: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(50),
    marginHorizontal: RFValue(5),
    paddingHorizontal: RFValue(15),
    borderRadius: RFValue(8),
  },
  card: {
    backgroundColor: '#E9FFF4',
    height: RFValue(110),
    marginBottom: RFValue(7),
    borderRadius: RFValue(8),
    flexDirection: 'row',
  },
  h1: {
    fontSize: RFValue(28),
    fontFamily: 'Poppins-Bold',
    color: '#313131',
  },
  h3: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    marginTop: RFValue(-8),
    color: '#313131',
  },
  cardOffer: {
    height: Dimensions.get('window').height / 6.5,
    borderRadius: 20,
    backgroundColor: '#2b1d3a96',
    overflow: 'hidden',
    marginTop: '5%',
  },
  button: {
    backgroundColor: colors.lightBlack,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
  },
});

export default Home;