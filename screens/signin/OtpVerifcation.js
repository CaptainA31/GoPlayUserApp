import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import ScreenLayout from '../../components/ScreenLayout';
import { colors } from '../../GlobalStyles';
import lock from '../../assets/password.png';
import nextIcon from '../../assets/nextIcon.png';
import backIcon from '../../assets/arrow.png';
import { TextInput } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtpVerification = ({ navigation, route }) => {
  // const { phone } = route.params;
  const { phone } = "+923052976751"
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [confirm, setConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState('');
  const otpInputs = useRef([]);

  // useEffect(() => {
    // setLoading(true);
    // Uncomment and implement your Firebase phone authentication logic here
    // const confirmation = auth()
    //   .signInWithPhoneNumber(phone)
    //   .then(c => {
    //     setLoading(false);
    //     setConfirm(c);
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setTitle('Error');
    //     setAlertBox(true);
    //     setMessage(
    //       'You have provided an incorrect phone number. Please provide a valid phone number',
    //     );
    //     setTimeout(() => {
    //       navigation.navigate('getPhone');
    //     }, 3000);
    //   });
  // }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleNext = () => {
    // const otpString = otp.join('');
    // setLoading(true);
    // confirm
    //   ?.confirm(otpString)
    //   .then(response => {
    //     setLoading(false);
    //     navigation.navigate('getEmail', { phone });
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setTitle('Error');
    //     setAlertBox(true);
    //     setMessage('Please provide a valid OTP number');
    //   });
    navigation.navigate("home");
  };

  return (
    <View style={{ height: '100%' }}>
      <LinearGradient style={{ height: '100%' }} colors={[colors.light, colors.dark]}>
        <AlertBox
          alertBox={alertBox}
          setAlertBox={setAlertBox}
          title={title}
          message={message}
        />
        <Loader value={loading} />
        <SafeAreaView style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('getPhone')}
            style={styles.backButton}>
            <Image source={backIcon} style={styles.backlogo} />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.circle}>
            <Image
              source={lock}
              style={{
                width: '50%',
                height: '50%',
                resizeMode: 'contain',
                tintColor: 'grey',
              }}
            />
          </View>
          <Text style={{ fontSize: RFValue(18), color: 'grey' }}>
            Verify your mobile number{' '}
          </Text>
          <View style={{ paddingHorizontal: '5%', marginTop: '2%' }}>
            <Text
              style={{
                fontSize: RFValue(14),
                color: 'grey',
                textAlign: 'center',
              }}>
              We have sent you SMS with a 6-digit verification code (OTP) on{' '}
              {phone}
            </Text>
          </View>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              style={styles.otpInput}
              ref={(input) => (otpInputs.current[index] = input)}
            />
          ))}
        </View>

        <View
          style={{
            height: '20%',
            alignItems: 'flex-end',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            disabled={loading}
            style={{ top: '35%' }}
            onPress={handleNext}>
            <View style={styles.button}>
              <Image
                style={{
                  width: '40%',
                  height: '40%',
                  resizeMode: 'contain',
                  tintColor: 'grey',
                }}
                source={nextIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  backlogo: {
    resizeMode: 'center',
    width: 18,
    height: 22,
  },
  headerContainer: {
    width: '90%',
    paddingTop: '5%',
    marginBottom: '-5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  circle: {
    backgroundColor: '#c3c3c354',
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  otpInput: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: RFValue(18),
    width: RFValue(40),
    height: RFValue(50),
    marginRight: Platform.OS === 'ios' ? RFValue(10) : RFValue(15),
  },
  button: {
    width: RFValue(50),
    height: RFValue(50),
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OtpVerification;
