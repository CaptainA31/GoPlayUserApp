import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/new_logo.jpg';
import apple from '../../assets/apple-logo.png';
import google from '../../assets/google.png';
import fb from '../../assets/facebook.png';
import {OutlinedTextField, TextField} from 'rn-material-ui-textfield';
import ScreenLayout from '../../components/ScreenLayout';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageModal from '../../components/MessageModal';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../GlobalStyles';
import PhoneInput from 'react-native-phone-number-input';
import {Login} from '../../services/signin';
import AlertBox from '../../components/AlertBox';
import GeneralInput from '../../components/GeneralInput';
// import { useFocusEffect } from '@react-navigation/native';

const SignIn = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('phone');
  // const [isFocused, setIsFocused] = useState(false); // state for empting the input fields

  // Reset state when screen becomes focused
  // useFocusEffect(() => {
  //   if(!isFocused){
  //     setPhone('');
  //     setEmail('');
  //     setPassword('');
  //   }
  // });
  const handleTabSwitch = tab => {
    setActiveTab(tab);
  };

  const handleSignIn = () => {
    let data = {};
    if (phone) {
      data = {
        phone: phone,
        // password: password,
      };
      setLoading(true);
    } else if (email) {
      data = {
        email: email,
        // password: password,
      };
      setLoading(true);
    } else {
      // setLoading(false);
      Keyboard.dismiss();
      setModalVisible(true);
      setError('Please enter your credentials');
      return;
    }
    // console.log('Login Data', data);

    console.log('response of login before api call: ');
    navigation.navigate('otp');

    // Login(data)
    //   .then(async res => {
    //     setLoading(false);

    //     if (res.data.status) {
    //       console.log('response of login: ', res);
    //       await AsyncStorage.setItem('token', res.data.token);

    //       navigation.navigate('Home');
    //     } else {
    //       Keyboard.dismiss();
    //       setModalVisible(true);
    //       setError(res.data.message);
    //     }
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     setModalVisible(true);
    //     setError(error.toString());
    //   });
  };

  return (
    // <ScreenLayout>
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.h2}>Welcome Back</Text>
        <Text style={styles.p}>Hello, welcome back to your account</Text>
      </View>
      {/* <View style={styles.loginContainer}> */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'phone' ? styles.activeTab : null]}
          onPress={() => handleTabSwitch('phone')}>
          <Text style={styles.tabText}>Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'email' ? styles.activeTab : null]}
          onPress={() => handleTabSwitch('email')}>
          <Text style={styles.tabText}>Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.displayContainer}>
        {activeTab === 'phone' ? (
          <>
            <PhoneInput
              defaultCode="PK"
              layout="first"
              // onChangeText={(text) => {
              //   console.log(text);
              // }}
              style={{borderwidth: 0, backgroundColor: 'red'}}
              onChangeFormattedText={text => {
                setPhone(text);
              }}
              countryPickerButtonStyle={{
                width: '17%',
                justifyContent: 'flex-end',
              }}
              codeTextStyle={{color: 'black'}}
              textInputStyle={{
                color: 'black',
                top: '0.5%',
                height: RFValue(50),
                fontFamily: 'Poppins-Regular',
              }}
              textContainerStyle={{
                backgroundColor: '#cb383700',
                paddingLeft: '2%',
              }}
              containerStyle={{
                backgroundColor: '#cb383700',
                height: RFValue(50),
                borderRadius: RFValue(8),
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
              }}
            />
            {/* <GeneralInput
              label={'Password'}
              visible={visible}
              setVisible={value => setVisible(value)}
              onChange={text => setPassword(text)}
              // onChangeText={setPassword}
              value={password}
              color={true}
              secureText={true}
              // onFocus = {()=>{setIsFocused(true)}}
            /> */}
            <View style={{marginTop: '5%'}}>
              <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.button}>
                  {loading ? (
                    <ActivityIndicator size={'small'} color={colors.light} />
                  ) : (
                    <Text style={styles.buttonText}>Next</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* <TextField
              label="Email"
              keyboardType="email-address"
              tintColor="black"
              baseColor="black"
              textColor="black"
              labelTextStyle={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                paddingTop: '2%',
              }}
              titleTextStyle={{color: 'black'}}
              containerStyle={{
                backgroundColor: '#cb383700',
                height: RFValue(50),
                borderRadius: RFValue(8),
                borderBottomColor: 'grey',
                marginTop: '-5%',
                marginBottom: '5%',
              }}
              onChangeText={setEmail}
            /> */}
            <GeneralInput
              label={'Email'}
              visible={visible}
              setVisible={value => setVisible(value)}
              onChange={text => setEmail(text)}
              color={true}
              value={email}
            />
            {/* <GeneralInput
              label={'Password'}
              visible={visible}
              setVisible={value => setVisible(value)}
              onChange={text => setPassword(text)}
              value={password}
              color={true}
              secureText
            /> */}
            <View style={{marginTop: '10%'}}>
              <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.button}>
                  {loading ? (
                    <ActivityIndicator size={'small'} color={colors.light} />
                  ) : (
                    <Text style={styles.buttonText}>Next</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '5%',
        }}>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: 'grey',
            marginLeft: 20,
          }}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'black',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 10 / 2,
          }}>
          OR
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: 'black',
            marginRight: 20,
          }}
        />
      </View>

      <View style={{paddingHorizontal: '10%'}}>
        {/* <TouchableOpacity onPress={handleSignIn}> */}
        <TouchableOpacity>
          <View style={styles.Continuebutton}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.light} />
            ) : (
              <>
                <Image source={apple} style={styles.socialLogo} />
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  Continue with Apple
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.Continuebutton}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.light} />
            ) : (
              <>
                <Image source={google} style={styles.socialLogo} />
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  Continue with Google
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.Continuebutton}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.light} />
            ) : (
              <>
                <Image source={fb} style={styles.socialLogo} />
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  Continue with Facebook
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingVertical: '5%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('getPhone')}>
          <Text style={styles.h3}>
            Don't have an account?
            <Text style={{color: '#4DAAE9'}}> Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* </View> */}

      {/* <View style={styles.loginContainer}>
        <Text style={[styles.h3, {fontSize: RFValue(18)}]}>
          Sign In To Continue
        </Text>
        <PhoneInput
          defaultCode="PK"
          layout="first"
          // onChangeText={(text) => {
          //   console.log(text);
          // }}
          onChangeFormattedText={text => {
            setPhone(text);
          }}
          countryPickerButtonStyle={{width: '17%', justifyContent: 'flex-end'}}
          codeTextStyle={{color: 'white'}}
          textInputStyle={{color: 'white', top: '0.5%', height: RFValue(50)}}
          textContainerStyle={{backgroundColor: '#cb383700', paddingLeft: '2%'}}
          containerStyle={{
            backgroundColor: '#cb383700',
            height: RFValue(50),
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: RFValue(4),
          }}
        />
        <View style={{marginTop: '4%'}}>
          <GeneralInput
            label={'Password'}
            visible={visible}
            setVisible={value => setVisible(value)}
            onChange={text => setPassword(text)}
          />
        </View>

        <View
          style={{alignItems: 'flex-end', marginTop: '3%', marginBottom: '5%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('forgetpass')}>
            <Text style={styles.subtitle}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.light} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingVertical: '5%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('getPhone')}>
            <Text style={styles.h3}>Doesn't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <AlertBox
        alertBox={modalVisible}
        setAlertBox={setModalVisible}
        title={'Error'}
        message={error}
      />
      {/*
      <MessageModal
      setModalVisible = {setModalVisible}
      message = {error}
       modalVisible= {modalVisible} /> */}
    </SafeAreaView>
    // </ScreenLayout>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '30%', // 70%
    height: '20%',
    resizeMode: 'contain',
  },
  h2: {
    fontSize: RFValue(30), //19
    color: 'black',
    fontWeight: "bold",
    fontFamily: 'Poppins-Bold',
  },
  p: {
    fontSize: RFValue(15),
    color: 'grey',
    fontFamily: 'Poppins-Regular',
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
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  loginContainer: {
    height: '70%',
    paddingHorizontal: '10%',
  },
  displayContainer: {
    // height: '20%',
    paddingHorizontal: '10%',
  },
  h3: {
    fontSize: RFValue(15),
    color: 'grey',
    paddingBottom: '6%',
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    fontSize: RFValue(15),
    fontFamily: 'Poppins-Regular',
    color: 'white',
    paddingBottom: '2%',
  },
  button: {
    // borderColor: 'white',
    backgroundColor: colors.light,
    // borderWidth: 1,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  Continuebutton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 38,
    marginVertical: 5,
    borderColor: '#E4E8E9',
    borderWidth: 1,
  },
  socialLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
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
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    bottom: '10%',
    tintColor: 'white',
  },
});

export default SignIn;
