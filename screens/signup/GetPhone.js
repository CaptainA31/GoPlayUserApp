import React, {useEffect, useState} from 'react';
import backIcon from '../../assets/arrow.png';
import logo from '../../assets/logo.png';
import BackgroundLogo from '../../assets/backgroundLogo.png';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import {RFValue} from 'react-native-responsive-fontsize';
import nextIcon from '../../assets/nextIcon.png';
import PhoneInput from 'react-native-phone-number-input';
import {imageStyle} from '../../GlobalStyles';
import {isPhoneExist} from '../../services/signin';
import Loader from '../../components/Loader';
import AlertBox from '../../components/AlertBox';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetPhone = ({navigation}) => {
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // getLocation().then((res)=> {
    //    setCountry(res.data)
    // })
  }, []);

  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [alertBox2, setAlertBox2] = useState(false);
  const [title, setTitle] = useState('');
  const [back, setBack] = useState();

  const handleNext = () => {
    if (!phone) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide the phone number');
      return;
    }
    let data = {
      phone: phone,
    };
    setLoading(true);
    // isPhoneExist(data)
    //   .then(res => {
    //     setLoading(false);
    //     console.log(res.data);
    //     if (res.data.status) {
    //       setTitle('Error');
    //       setAlertBox(true);
    //       setMessage(res.data.message);
    //       return;
    //     } else {
    //       // navigation.navigate('otp', {phone: phone});
    //       navigation.navigate('getEmail', {phone: phone});
    //     }
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    navigation.navigate('getEmail', {phone: phone});
  };

  return (
    <ScreenLayout>
      <Loader value={loading} />

      <AlertBox
        alertBox={alertBox}
        setAlertBox={setAlertBox}
        title={title}
        message={message}
      />

      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('signin')}
          style={styles.backButton}>
          <Image source={backIcon} style={styles.backlogo} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* <ImageBackground source={BackgroundLogo} style={styles.logo}>
        <Image
          source={logo}
          style={[imageStyle, {width: '50%', height: '50%'}]}
        />
      </ImageBackground> */}

      <View style={styles.formContainer}>
        <Text style={styles.h3}>What's Your Phone Number?</Text>
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
        {/* <PhoneInput
          defaultCode="PK"
          layout="first"
          // onChangeText={(text) => {
          //   console.log(text);
          // }}
          onChangeFormattedText={text => {
            setPhone(text);
          }}
          countryPickerButtonStyle={{width: '17%', justifyContent: 'flex-end'}}
          codeTextStyle={{color: 'black'}}
          textInputStyle={{color: 'black', top: '0.5%', height: RFValue(35)}}
          textContainerStyle={{backgroundColor: '#cb383700', paddingLeft: '2%'}}
          containerStyle={{
            backgroundColor: '#cb383700',
            height: RFValue(55),
            borderWidth: 0,
            borderColor: 'grey',
            borderRadius: 0,
            borderBottomWidth: 1,
          }}
        /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: '3%',
          }}>
          <TouchableOpacity style={{top: '35%'}} onPress={() => handleNext()}>
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
      </View>
    </ScreenLayout>
    
  );
};
const styles = StyleSheet.create({
  backlogo: {
    resizeMode: 'center',
    width: 18,
    height: 22,
  },
  h2: {
    marginLeft: '3%',
    top: '0.5%',
    fontSize: RFValue(17),
    color: 'white',
  },
  headerContainer: {
    width: '90%',
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    position: 'absolute',
  },
  formContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '10%',
    justifyContent: 'center',
  },
  h3: {
    paddingBottom: '10%',
    fontSize: RFValue(18),
    color: 'grey',
  },
  backButton: {
    right: '50%',
    paddingHorizontal: '4%',
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default GetPhone;
