import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { RFValue } from 'react-native-responsive-fontsize';
import backIcon from '../../assets/arrow.png';
import nextIcon from '../../assets/nextIcon.png';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import { isEmailExist, Register } from '../../services/signin';
import AlertBox from '../../components/AlertBox';
import AlertBox2 from '../../components/AlertBox2';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { ScreenContainer, Screen } from 'react-native-screens';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetEmail = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState({ dd: '', mm: '', yyyy: '' });
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmPassword] = useState('');
  // const { phone } = route.params;
  const { phone } = "+923052976751";
  const [currentIndex, setCurrentIndex] = useState(0);

  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState('');
  const [alertBox2, setAlertBox2] = useState(false);
  const [back, setBack] = useState();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      if (currentIndex === 5) {
        return navigation.dispatch(e.data.action);
      }

      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setTitle('Discard changes?');
        setAlertBox2(true);
        setMessage(
          'You have unsaved changes. Are you sure to discard them and leave the screen?'
        );
        setBack(e.data.action);
      }
    });

    return unsubscribe;
  }, [navigation, currentIndex]);

  const handleAbort = () => {
    setAlertBox2(false);
    navigation.dispatch(back);
  };

  const handleNext = () => {
    if (currentIndex === 0) {
      return handleEmailValidation();
    }

    if (currentIndex === 1) {
      return handleNameValidation();
    }
    if (currentIndex === 2) {
      return handleDateValidation();
    }
    if (currentIndex === 3) {
      return handleGender();
    }

    if (currentIndex === 4) {
      let data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        gender: gender,
        age: age,
        password: password,
      };

      if (password !== confirm) {
        setTitle('Error');
        setAlertBox(true);
        setMessage("Password doesn't match");
        return;
      }

      if (!password || !confirm) {
        setTitle('Error');
        setAlertBox(true);
        setMessage('Please provide password');
        return;
      }

      const complexityOptions = {
        min: 8,
        max: 30,
        symbol: 1,
        requirementCount: 2,
      };

      const validation = passwordComplexity(complexityOptions).validate(password);
      if (validation.error) {
        setTitle('Error');
        setAlertBox(true);
        setMessage(
          'Your password must include 8 or more characters and a Letter symbol'
        );
        return;
      }

      Register(data).then(res => {
        if (res.data.status) {
          setCurrentIndex(currentIndex + 1);
          setTitle('Success');
          setAlertBox(true);
          setMessage('You have been successfully registered');
          setTimeout(() => {
            navigation.navigate('selectSport', { phone: phone });
          }, 3000);
        }
      });
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleEmailValidation = () => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
    });

    if (email) {
      let data = {
        email: email,
      };
      const validation = schema.validate(data);

      if (validation.error) {
        setTitle('Error');
        setAlertBox(true);
        setMessage('Email format is not valid');
        return;
      }
      isEmailExist(data).then(res => {
        if (res.data.status) {
          setTitle('Error');
          setAlertBox(true);
          setMessage(res.data.message);
          return;
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      });
    } else {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide email');
      return;
    }

    return;
  };

  const handleNameValidation = () => {
    if (!firstName || !lastName) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide full name');
      return;
    } else {
      var reg = /^[a-z]+$/i;

      var firstValid = reg.test(firstName);
      var secondValid = reg.test(lastName);
      if (firstValid && secondValid) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setTitle('Error');
        setAlertBox(true);
        setMessage('Name should contain alphabets only');
        return;
      }
    }
  };

  const handleDateValidation = () => {
    if (!age.dd || !age.mm || !age.yyyy) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide date of birth');
      return;
    }
    if (Number(age.dd) > 31) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Days can not be greater than 31');
      return;
    }
    if (Number(age.mm) > 12) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Months can not be greater than 12');
      return;
    }
    if (Number(age.yyyy) > 2017) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Invalid birth year');
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleGender = () => {
    if (!gender) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select Gender');
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.headerContainer}>
        <AlertBox
          alertBox={alertBox}
          setAlertBox={setAlertBox}
          title={title}
          message={message}
        />

        <AlertBox2
          alertBox={alertBox2}
          setAlertBox={setAlertBox2}
          title={title}
          message={message}
          onAbort={handleAbort}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('signin')}
          style={styles.backButton}>
          <Image source={backIcon} style={styles.backlogo} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.formContainer}>
        <ScreenContainer style={{ flex: 1 }}>
          <Screen activityState={currentIndex === 0 ? 2 : 0} style={{ flex: 1 }}>
            <Step1 setEmail={setEmail} />
          </Screen>
          <Screen activityState={currentIndex === 1 ? 2 : 0} style={{ flex: 1 }}>
            <Step2 setFirstName={setFirstName} setLastName={setLastName} />
          </Screen>
          <Screen activityState={currentIndex === 2 ? 2 : 0} style={{ flex: 1 }}>
            <Step3 setAge={setAge} age={age} />
          </Screen>
          <Screen activityState={currentIndex === 3 ? 2 : 0} style={{ flex: 1 }}>
            <Step4 setGender={setGender} gender={gender} />
          </Screen>
          <Screen activityState={currentIndex === 4 ? 2 : 0} style={{ flex: 1 }}>
            <Step5 setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
          </Screen>
        </ScreenContainer>

        <SafeAreaView style={styles.navigationContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Image source={nextIcon} style={styles.nextIcon} />
          </TouchableOpacity>
        </SafeAreaView>
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
    color: 'grey',
  },
  headerContainer: {
    width: '90%',
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '10%',
    justifyContent: 'center',
  },
  backButton: {
    right: '50%',
    paddingHorizontal: '4%',
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
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
  nextIcon: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    tintColor: 'grey',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: '3%',
  },
});

export default GetEmail;
