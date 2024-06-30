import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../assets/new_logo.jpg';
import Icon from '../assets/backgroundLogo.png';
import ScreenLayout from '../components/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {verifyToken} from '../services/signin';

const SplashScreen = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      handleAuth();
      return () => null;
    }, [navigation]),
  );

  const handleAuth = () => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        verifyToken().then(res => {
          if (res.data.status) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('signin');
          }
        });
      } else {
        setTimeout(() => {
          navigation.navigate('signin');
        }, 3000);
      }
    }, 100);
  };

  return (
    //    <ScreenLayout invert = {true}>
    <SafeAreaView style={styles.container}>
      <ImageBackground
        // source = {Icon}
        fadeDuration={100}
        resizeMode="contain"
        style={styles.backgroundContainer}>
        <Image fadeDuration={1600} source={logo} style={styles.logo} />
      </ImageBackground>
    </SafeAreaView>
    //    </ScreenLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundContainer: {
    width: '100%',
    paddingVertical: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
    height: '40%',
    top: '2%',
    resizeMode: 'contain',
  },
});
export default SplashScreen;
