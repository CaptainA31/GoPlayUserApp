import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import MyTabBar from '../../components/MyTabBar';
import {colors, screen} from '../../GlobalStyles';
import {getAllSports} from '../../services/signin';
import Games from '../../components/Games';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchPlayNow} from '../../redux/playNowSlice';
import {
  joinBookingGame,
  joinGame,
  leaveBookingGame,
  leaveGame,
} from '../../services/HostActivity';
// import {fetchMyGames} from '../../redux/myGamesSlice';
import Loader from '../../components/Loader';
import wallpaper from '../../assets/wallpaper.png';
import FilterModal from './FilterModal';
import AlertBox from '../../components/AlertBox';
import noInvites from '../../assets/noGames.png';
import addIcon from '../../assets/plus.png';
import avatar from '../../assets/avatar.png';
import messages from '../../assets/messages.png';
import lion from '../../assets/lion-bg.png';
import player from '../../assets/player.png';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Play = ({navigation}) => {
  const [sports, setSports] = useState([{name: 'All', id: 0}]);
  // const playList = useSelector(state => state?.playNow);
  const [playListFilter, setPlayListFilter] = useState([]); // playList.myGamesList
  const [selectedSport, setSelectedSport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchLocation, setSearchLocation] = useState();
  const [activeTab, setActiveTab] = useState('Outdoor Sports');

  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState('');

  const onBack = () => {
    navigation.navigate('HOME');
  };

  useEffect(() => {
    getAllSports().then(res => {
      setSports([...sports, ...res.data.sports]);
    });
  }, []);

  useEffect(() => {
    // setPlayListFilter(playList.myGamesList);
  }, []); // [playList]

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // dispatch(fetchPlayNow());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleJoinGame = game => {
    setLoading(true);
    setDisable(true);
    let data = {
      gameId: game._id,
    };
    joinGame(data).then(res => {
      setLoading(false);
      if (res.data.status) {
        setDisable(false);
        // dispatch(fetchPlayNow());
        // dispatch(fetchMyGames());
      } else {
        setLoading(false);
        setTitle('Error');
        setAlertBox(true);
        setMessage(res.data.message);
        setDisable(false);
      }
    });
  };

  const handleLeaveGame = game => {
    setLoading(true);
    setDisable(true);
    let data = {
      gameId: game._id,
    };
    leaveGame(data).then(res => {
      if (res.data.status) {
        setLoading(false);
        setDisable(false);
        // dispatch(fetchPlayNow());
      } else {
        setLoading(false);
        setTitle('Error');
        setAlertBox(true);
        setMessage(res.data.message);
        return;
      }
    });
  };

  const handleFilter = item => {
    if (item) {
      if (selectedSport == item) {
        setSelectedSport(null);
        // setPlayListFilter(playList.myGamesList);
        return;
      }
      if (item.id == 0) {
        setSelectedSport(item);
        // setPlayListFilter(playList.myGamesList);
        return;
      }
      setSelectedSport(item);
      // const filterOut = playList.myGamesList.filter(
      //   element => element.selectedSport._id == item._id,
      // );
      // setPlayListFilter(filterOut);
    }
  };

  const checkMultiple = item => {
    if (selectedSport == item) {
      return true;
    } else {
      return false;
    }
  };

  const handleTabSwitch = tab => {
    setActiveTab(tab);
  };

  const handleSearchLocation = name => {
    if (name) {
      setModalVisible(false);
      // const filterOut = playList.myGamesList.filter(element =>
      //   element.location.name.toLowerCase().includes(name.toLowerCase()),
      // );
      // setPlayListFilter(filterOut);

      // if (filterOut.length > 0){
      //     setPlayListFilter(filterOut)
      // }else {
      //     setPlayListFilter(playList.myGamesList)
      // }
    } else {
      // setPlayListFilter(playList.myGamesList);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={screen}>
      {/* <Header
          onBack={onBack}
          heading={'Play'}
          text={'Filters'}
          onTextPress={() => setModalVisible(true)}
        /> */}
      <Loader value={loading} />

      <AlertBox
        alertBox={alertBox}
        setAlertBox={setAlertBox}
        title={title}
        message={message}
      />

      <View
        style={{
          height: '20%',
          paddingTop: '7%',
          paddingHorizontal: '5%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        {/* User greeting section */}
        <Text style={styles.userGreetingText}>Hi, Saad</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Outdoor Sports' ? styles.activeTab : null,
          ]}
          onPress={() => handleTabSwitch('Outdoor Sports')}>
          <Text style={styles.tabText}>Outdoor Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Indoor Sports' ? styles.activeTab : null,
          ]}
          onPress={() => handleTabSwitch('Indoor Sports')}>
          <Text style={styles.tabText}>Indoor Sports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
  {modalVisible ? (
    <FilterModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      location={searchLocation}
      handleSearchLocation={handleSearchLocation}
      setLocation={setSearchLocation}
    />
  ) : null}
  <FlatList
    data={sports}
    keyExtractor={item => item._id}
    showsHorizontalScrollIndicator={false}
    horizontal
    renderItem={({ item }) => {
      return (
        <Pressable
          onPress={() => handleFilter(item)}
          style={
            checkMultiple(item)
              ? [styles.listButton, styles.selectedListButton]
              : styles.listButton
          }>
          <Text style={{ color: 'grey', fontSize: RFValue(13) }}>
            {item.name}
          </Text>
        </Pressable>
      );
    }}
  />
</View>

      <ImageBackground
        source={wallpaper}
        imageStyle={{width: '100%', height: '100%'}}
        style={{paddingTop: '3%', paddingHorizontal: '3%', height: '74.5%', borderRadius: '100px'}}>
        {/* <TouchableOpacity style={{ height :50  , 
                          position : "absolute" , width :Dimensions.get('window').width,
                          justifyContent: 'center', alignItems: 'center', flexDirection : "row",
                           bottom : 0, marginBottom : 15 }}>
                            <View style={{
                                width : 30 , height : 30, 
                                borderColor : colors.light,
                                 borderRadius : 50, marginRight : 10
                                }}>
                                <Image
                                source={addIcon}
                                style={{width : "100%" , height : "100%", resizeMode : "contain" , tintColor :colors.light}}
                                />
                            </View>
                            <Text>Host an Activity</Text>
                        </TouchableOpacity> */}

        <ImageBackground
          source={lion}
          imageStyle={{
            resizeMode: 'cover',
            width: '60%',
            height: '100%',
            // zIndex: 9999,
          }}
          style={{
            //#00F5A0', '#00D9F5'
            backgroundColor: '#00F5A0',
            height: RFValue(130),
            flexDirection: 'row',
            alignItems: 'center', // Align items vertically
            justifyContent: 'space-between',
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
              }}>
              Championship
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(15),
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
              marginBottom: RFValue(10),
            }}
          />
        </ImageBackground>

        {playListFilter.length > 0 ? (
          <FlatList
            data={playListFilter}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              return (
                <View style={{marginTop: 10}}>
                  <Games
                    navigation={navigation}
                    disable={disable}
                    handleLeaveGame={handleLeaveGame}
                    myGameList={item}
                    handleJoinGame={handleJoinGame}
                  />
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={['']}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              return (
                <View style={styles.noBooking}>
                  {/* <Text style={{color : colors.light}}>Currently you have no bookings</Text> */}
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: '90%',
                      height: '90%',
                    }}
                    source={noInvites}
                  />
                </View>
              );
            }}
          />
        )}

        <Pressable
          onPress={() => navigation.navigate('hostActivity')}
          style={{
            height: 50,
            position: 'absolute',
            alignSelf: 'center',
            bottom: 10,
            width: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 25, height: 25, justifyContent: 'center'}}>
              <Image
                source={addIcon}
                style={{
                  width: '80%',
                  height: '80%',
                  resizeMode: 'contain',
                  tintColor: colors.light,
                }}
              />
            </View>
            <Text>Host an Activity</Text>
          </View>
        </Pressable>
      </ImageBackground>

      <View
        style={{
          height: '16%',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'green',
        }}>
        <MyTabBar navigation={navigation} currentTab="PLAY" />
      </View>
    </SafeAreaView>
  );
};

export default Play;

const styles = StyleSheet.create({
  listContainer: {
    height: '5%',
    marginTop: 20,
    justifyContent: 'center',
    paddingLeft: '5%',
    marginBottom: 10,
  },
  listButton: {
    borderColor: 'grey',
    borderWidth: 1,
    height: RFValue(32),
    width: RFValue(80),
    marginRight: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EDEDED',
    marginHorizontal: '10%',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  tab: {
    padding: 16,
    color: 'white',
    //
    width: '50%',
    backgroundColor: '#EDEDED',
  },
  activeTab: {
    // borderBottomWidth: 2,
    // borderBottomColor: 'white',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  tabText: {
    fontSize: RFValue(12),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userGreetingText: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: '#000', // adjust the color as needed
    marginRight: RFValue(10),
    marginTop: RFValue(10),
  },
  noBooking: {
    height: RFValue(100),
    width: '100%',
    marginTop: '4%',
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
  listContainer: {
    height: '5%',
    marginTop: 20,
    justifyContent: 'center',
    paddingLeft: '5%',
    marginBottom: 10,
  },
  listButton: {
    borderColor: 'grey',
    borderWidth: 1,
    height: RFValue(32),
    width: RFValue(80),
    marginRight: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedListButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});
