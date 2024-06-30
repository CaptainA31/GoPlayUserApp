import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import profile from '../assets/edit.png';
import pastGames from '../assets/pastGames.png';
import userProfile from '../assets/profile.png';
import avatar from '../assets/avatar.png';
import invites from '../assets/invites.png';
import settings from '../assets/setting.png';
import contact from '../assets/contacts.png';
import terms from '../assets/terms.png';
import privacy from '../assets/privacy.png';
import logout from '../assets/logout.png';
import {capitalizeFirstLetter, colors, stringReduce} from '../GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import {userDetail} from '../services/signin';
// import {useSelector} from 'react-redux';
import {webURL} from '../services/BaseURL';
import AlertBox3 from './AlertBox3';

export const CustomDrawerComponent = ({navigation}) => {
  const menus = [
    {name: 'Edit Profile', navigation: 'EDITPROFILE', icon: profile},
    {
      name: 'My Past Games/Bookings',
      navigation: 'myPastGames',
      icon: pastGames,
    },
    {name: 'My Invites', navigation: 'myInvites', icon: invites},
    {name: 'Account Settings', navigation: 'ACCOUNT', icon: settings},
    {name: 'Contact Us', navigation: 'Contact', icon: contact},
    {name: 'Terms and Conditions', navigation: 'TERMS', icon: terms},
    {name: 'Privacy Policy', navigation: 'PRIVACY', icon: privacy},
  ];
  const [user, setUser] = useState(userDetail);
  // const userDetail = useSelector(state => state?.userDetail.userDetail);
  // const inviteList = useSelector(state => state?.inviteList.InviteList);

  const [message, setMessage] = useState('');
  const [alertBox2, setAlertBox2] = useState(false);
  const [title, setTitle] = useState('');

  const handleLogout = async () => {
    setTitle('Logout?');
    setMessage('Are you sure you want to logout?');
    setAlertBox2(true);
  };

  const handleAbort = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('splash');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AlertBox3
          alertBox={alertBox2}
          setAlertBox={setAlertBox2}
          title={title}
          message={message}
          onAbort={handleAbort}
        />
        <View style={{flexDirection: 'row', height: 80, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EDITPROFILE')}
            style={styles.circle}>
            <Image
              source={
                userDetail.profilePic == ''
                  ? avatar
                  : {uri: `${webURL}${userDetail.profilePic}`}
              }
              style={{
                width: '95%',
                height: '95%',
                borderRadius: 50,
                resizeMode: 'cover',
                // borderColor: 'black',
              }}
            />
          </TouchableOpacity>
          <View style={{marginLeft: '3%'}}>
            <View style={{width: 150}}>
              <Text style={{color: 'black', fontSize: RFValue(12)}}>
                {stringReduce(
                  `${capitalizeFirstLetter(
                    userDetail.firstName,
                  )} ${capitalizeFirstLetter(userDetail.lastName)}`,
                  20,
                )}
              </Text>
            </View>
            <Text style={{color: 'black', fontSize: RFValue(12)}}>
              {capitalizeFirstLetter(userDetail.gender)} | {userDetail.age}
            </Text>
          </View>
        </View>

        <View style={styles.divider}></View>
      </View>

      <View style={styles.menus}>
        <View style={styles.upperContainer}>
          {menus.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.closeDrawer();
                  navigation.navigate(item.navigation);
                }}
                key={item.name}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '6%',
                  marginBottom: '6%',
                }}>
                <Image style={styles.icon} source={item.icon} />
                <Text style={styles.text}>{item.name}</Text>
                {/* {item.name == 'My Invites' */}
                   {/* ? inviteList.length > 0 && ( */}
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 50,
                          backgroundColor: 'red',
                          marginLeft: 5,
                        }}></View>
                        {/* </View> */}
                     {/* ) */}
                   {/* : null} */}
              </TouchableOpacity>
            );
          })}
        </View>

        <View>
          <View style={styles.logout}>
            <Pressable
              onPress={handleLogout}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.logoutIcon} source={logout} />
              <Text style={styles.text}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: '10%',
    paddingVertical: '20%',
  },
  header: {
    height: '15%',
    width: '100%',
  },
  menus: {
    height: '75%',
    width: '100%',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: RFValue(17),
    color: 'black',
    fontWeight: 'bold',
    marginTop: '10%',
  },
  divider: {
    height: RFValue(1),
    width: '78%',
    backgroundColor: colors.light,
    marginTop: '8%',
  },

  icon: {
    width: RFValue(14),
    tintColor: 'black',
    height: RFValue(14),
    marginRight: RFValue(10),
  },
  logoutIcon: {
    width: RFValue(18),
    tintColor: 'black',
    height: RFValue(17),
    marginRight: RFValue(10),
    resizeMode: 'center',
  },
  text: {
    fontSize: RFValue(14),
    color: 'black',
  },
  logout: {
    marginLeft: '1%',
    borderWidth: 1,
    borderColor: colors.light,
    width: '80%',
    marginBottom: '4%',
    height: RFValue(50),
    backgroundColor: '#f5f5f52e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(5),
  },
  circle: {
    height: RFValue(77),
    width: RFValue(77),
    borderRadius: 100,
    //  backgroundColor : "white",
    padding: '1%',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
