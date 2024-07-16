import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../GlobalStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import backIcon from '../../assets/arrow.png';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if value is not empty and not the last input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    // Handle OTP verification logic here
  };

  const handleResendOtp = () => {
    // Handle resend OTP logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('signin')}
          style={styles.backButton}>
          <Image source={backIcon} style={styles.backlogo} />
        </TouchableOpacity>
        <Text style={styles.h2}>OTP Verification</Text>
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.h1}>Enter OTP</Text>
        <Text style={styles.p}>6 digit code has been sent to </Text>
        <Text style={styles.p}>+923341891347</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.otpInput,
              digit && { borderColor: colors.light, color: colors.light }
            ]}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive the code?{' '}
        <Text style={styles.resendLink} onPress={handleResendOtp}>Resend OTP</Text>
      </Text>

      <Text style={styles.termsText}>
        By signing up, you agree to our <Text style={styles.link}>Terms of Service</Text> and acknowledge that our <Text style={styles.link}>Privacy Policy</Text> applies to you.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backlogo: {
    resizeMode: 'center',
    width: 18,
    height: 22,
  },
  backButton: {
    right: '50%',
    paddingHorizontal: '4%',
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 30,
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2: {
    flex: 1,
    textAlign: 'center',
    fontSize: RFValue(20),
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  h1: {
    textAlign: 'center',
    fontSize: RFValue(30),
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  p: {
    fontSize: RFValue(15),
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 30,
  },
  otpInput: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 12,
    backgroundColor: '#F4F4F4',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F4F4F4',
  },
  button: {
    backgroundColor: colors.light,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  resendText: {
    fontSize: RFValue(14),
    color: 'grey',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  resendLink: {
    color: '#4DAAE9',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: RFValue(12),
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 160,
    fontFamily: 'Poppins-Regular',
  },
  link: {
    color: '#4DAAE9',
    textDecorationLine: 'underline',
  },
});

export default OtpVerification;
  