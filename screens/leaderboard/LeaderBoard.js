import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import {colors, stringReduce} from '../../GlobalStyles';
import {webURL} from '../../services/BaseURL';
import {getGlobalUsers, userDetail} from '../../services/signin';
import profile from '../../assets/profile.png';
import secondIcon from '../../assets/secondMedal.png';
import firstIcon from '../../assets/firstMedal.png';
import thirdIcon from '../../assets/thirdMedal.png';
import wallpaper from '../../assets/wallpaper.png';
import box from '../../assets/leaderbox.png';

const LeaderBoard = ({navigation}) => {
  const [first, setFirst] = useState(userDetail);
  const [second, setSecond] = useState(userDetail);
  const [third, setThird] = useState(userDetail);
  const [others, setOThers] = useState([]);

  useEffect(() => {
    getGlobalUsers().then(async res => {
      setFirst(res.data.users[0]);
      setSecond(res.data.users[1]);
      setThird(res.data.users[2]);

      let newItem = [];
      let filterOthers = await res.data.users.map((item, index) => {
        if (index > 2) {
          newItem.push(item);
        }
      });
      setOThers(newItem);
    });
  }, []);

  const levelCalculator = points => {
    if (points > 0 && points <= 100) {
      return 1;
    }
    if (points > 100 && points <= 200) {
      return 2;
    }
    if (points > 200 && points <= 300) {
      return 3;
    }
    if (points > 300 && points <= 400) {
      return 4;
    }
    if (points > 400 && points <= 500) {
      return 5;
    }
    if (points > 500 && points <= 600) {
      return 6;
    }
    if (points > 600 && points <= 700) {
      return 7;
    }
    if (points > 700 && points <= 800) {
      return 8;
    }
    if (points > 800 && points <= 900) {
      return 9;
    }
    if (points > 900) {
      return 10;
    }
  };

  return (
    <ImageBackground
      source={wallpaper}
      imageStyle={{width: '100%', height: '100%', resizeMode: 'cover'}}
      style={{height: '100%', backgroundColor: 'white'}}>
      <Header
        onBack={() => navigation.navigate('Home')}
        heading={'Leaderboard'}
      />

      <View style={styles.leaderBoardContainer}>
        {/* <Image
          source={box}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        /> */}

        {/* firsr card */}
        <View style={[styles.leaderBoardCard, {top: '-1.5%', width: '27%'}]}>
          <View
            style={{
              alignSelf: 'flex-end',
              top: '-10%',
              position: 'absolute',
              width: 35,
              height: 35,
            }}>
            <Image
              source={secondIcon}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={
                second.profilePic == ''
                  ? profile
                  : {uri: `${webURL}${second.profilePic}`}
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
          </View>
          <Text style={{color: colors.light, fontSize: RFValue(9)}}>
            {stringReduce(`${second.firstName} ${second.lastName}`, 16)}
          </Text>
          <Text style={{color: colors.light, fontSize: RFValue(9)}}>
            {second.gender} | {second.age} Years
          </Text>
          <Text style={{color: 'grey'}}>{second.points}</Text>
          <Text style={{color: 'grey'}}>
            Level : {levelCalculator(second.points)}
          </Text>
        </View>

        {/* center card */}
        <View style={[styles.leaderBoardCard, styles.shadow]}>
          <View
            style={{
              alignSelf: 'flex-end',
              top: '-10%',
              position: 'absolute',
              width: 35,
              height: 35,
            }}>
            <Image
              source={firstIcon}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={
                first.profilePic == ''
                  ? profile
                  : {uri: `${webURL}${first.profilePic}`}
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
          </View>
          <Text style={{color: colors.light, fontSize: RFValue(10)}}>
            {stringReduce(`${first.firstName} ${first.lastName}`, 16)}
          </Text>
          <Text style={{color: colors.light, fontSize: RFValue(9)}}>
            {first.gender} | {first.age} Years
          </Text>
          <Text style={{color: 'grey'}}>{first.points}</Text>
          <Text style={{color: 'grey'}}>
            Level : {levelCalculator(first.points)}
          </Text>
        </View>

        {/* last card */}
        <View style={[styles.leaderBoardCard, {width: '27%'}]}>
          <View
            style={{
              alignSelf: 'flex-end',
              top: '-10%',
              position: 'absolute',
              width: 35,
              height: 35,
            }}>
            <Image
              source={thirdIcon}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={
                third?.profilePic == ''
                  ? profile
                  : {uri: `${webURL}${third?.profilePic}`}
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
          </View>
          <Text style={{color: colors.light, fontSize: RFValue(10)}}>
            {stringReduce(`${third.firstName} ${third.lastName}`, 16)}
          </Text>
          <Text style={{color: colors.light, fontSize: RFValue(9)}}>
            {third.gender} | {third.age} Years
          </Text>
          <Text style={{color: 'grey'}}>{third.points}</Text>
          <Text style={{color: 'grey'}}>
            Level : {levelCalculator(third.points)}
          </Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
          }}>
          {/* <Text style={{fontSize : RFValue(16) }}>Rank</Text>
                <Text style={{fontSize : RFValue(16) }}>Players</Text>
                <Text style={{fontSize : RFValue(16) }}>Points</Text>
                <Text style={{fontSize : RFValue(16) }}>Level</Text> */}
        </View>

        <FlatList
          data={others}
          renderItem={({item, index}) => {
            return (
              <View style={styles.card}>
                <View
                  style={{
                    width: '10%',
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: RFValue(20),
                    backgroundColor: '#B2E69A',
                    marginLeft: '2%',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#309700',
                    }}>
                    {index + 4}
                  </Text>
                </View>

                <View
                  style={{
                    width: '48%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={[styles.circle, {width: 40, height: 40}]}>
                    <Image
                      source={
                        item.profilePic == ''
                          ? profile
                          : {uri: `${webURL}${item.profilePic}`}
                      }
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        resizeMode: 'cover',
                        borderColor: '#38B000',
                        borderWidth: 2,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: '6%'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: RFValue(16),
                        fontWeight: 'bold',
                      }}>
                      {stringReduce(`${item.firstName} ${item.lastName}`, 16)}
                    </Text>
                    {/* <Text style={{color: 'black'}}>
                          {item.gender} | {item.age}
                        </Text> */}

                    <Text
                      style={{
                        color: colors.light,
                        borderRadius: RFValue(20),
                        backgroundColor: '#B2E69A',
                        paddingLeft: RFValue(10),
                        paddingVertical: RFValue(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        width: '80%',
                      }}>
                      Level {levelCalculator(item.points)}
                    </Text>
                  </View>
                </View>
                {/* <View
                      style={{
                        width: '15%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'black'}}>{item.points}</Text>
                    </View> */}
                <View
                  style={{
                    width: '27%',
                    height: '100%',
                    paddingRight: '5%',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'black'}}>
                    {levelCalculator(item.points)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  leaderBoardContainer: {
    height: '27%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '2%',
  },
  card: {
    height: 70,
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaderBoardCard: {
    backgroundColor: 'white',
    height: '80%',
    width: '33%',
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: '4%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 7,
    },
    shadowOpacity: 0.32,
    shadowRadius: 10,
    elevation: 15,
    top: '-3%',
  },
  circle: {
    borderRadius: 50,
    width: RFValue(50),
    height: RFValue(50),
    marginBottom: '3%',
  },
  detailContainer: {
    height: '62%',
    paddingHorizontal: '3%',
  },
});
