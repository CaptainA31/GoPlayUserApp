import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  Image,
} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {colors} from '../../../GlobalStyles';
import RangeSlider from './RangeSlider';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'expo-linear-gradient';
import info from '../../../assets/info.png';
import SkillsDropdown from '../components/SkillsDropDown'; // Import the SkillsDropdown component

var radio_props = [
  {label: 'Public', value: 0},
  {label: 'Invites Only', value: 1},
];

const Player = ({
  skills,
  setInviteVisible,
  setAge,
  setSkills,
  setTotal,
  gender,
  setGender,
  eventType,
  setEventType,
  setConfirmed,
  total,
  confirmed,
}) => {
  const skillsType = ['Beginner', 'Intermediate', 'Expert'];
  const genderType = ['Male', 'Female', 'Unisex'];

  const handleSkills = item => {
    setSkills(item);
  };

  const handleGender = item => {
    setGender(item);
  };

  const handleEventType = item => {};

  const checkMultiple = item => {
    if (skills == item) {
      return false;
    } else {
      return true;
    }
  };
  const checkGender = item => {
    if (gender == item) {
      return false;
    } else {
      return true;
    }
  };

  const handleInvite = value => {
    setInviteVisible(true);
    setEventType(value);
  };

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>Skills</Text>
      <View style={styles.skillsContainer}>
        {skillsType.map(item => {
          return (
            <TouchableOpacity
              onPress={() => handleSkills(item)}
              style={{width: '32%'}}>
              <LinearGradient
                colors={
                  checkMultiple(item)
                    ? ['white', 'white']
                    : [colors.light, colors.dark]
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={checkMultiple(item) ? styles.button : styles.selected}>
                <Text style={{color: checkMultiple(item) ? 'black' : 'white'}}>
                  {item}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{marginTop: '4%'}}>
        <Text style={{fontWeight: 'bold'}}>Players</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '2%',
        }}>
        <View style={{width: '49%'}}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="grey"
            keyboardType="numeric"
            value={total}
            containerStyle={{height: RFValue(45)}}
            inputContainerStyle={{paddingRight: '20%', height: RFValue(45)}}
            onChangeText={event => setTotal(event)}
            label="Total"
          />
        </View>
        <View style={{width: '49%'}}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="grey"
            keyboardType="numeric"
            value={confirmed}
            containerStyle={{height: RFValue(45)}}
            inputContainerStyle={{paddingRight: '20%', height: RFValue(45)}}
            onChangeText={event => setConfirmed(event)}
            label="Confirmed"
          />
        </View>
      </View>
      <View style={{marginVertical: '2%'}}>
        <Text style={{fontWeight: 'bold'}}>Age</Text>
      </View>
      <RangeSlider setAge={setAge} />
      <View style={{marginTop: '3%'}}>
        <Text style={{fontWeight: 'bold'}}>Gender</Text>
        <View style={styles.skillsContainer}>
          {genderType.map(item => {
            return (
              <TouchableOpacity
                onPress={() => handleGender(item)}
                style={{width: '32%'}}>
                <LinearGradient
                  colors={
                    checkGender(item)
                      ? ['white', 'white']
                      : [colors.light, colors.dark]
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={checkGender(item) ? styles.button : styles.selected}>
                  <Text style={{color: checkGender(item) ? 'black' : 'white'}}>
                    {item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={{marginTop: '3%'}}>
        <Text style={{fontWeight: 'bold'}}>Event Type</Text>
        <View style={{marginTop: '2%'}}>
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={eventType === i}
                  onPress={value => {
                    if (value) {
                      handleInvite(value);
                    } else {
                      setEventType(value);
                    }
                  }}
                  borderWidth={1}
                  buttonInnerColor={colors.light}
                  buttonOuterColor={eventType === i ? colors.light : 'grey'}
                  buttonSize={12}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: '10%'}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => {
                    if (value) {
                      handleInvite(value);
                    } else {
                      setEventType(value);
                    }
                  }}
                  labelStyle={{fontSize: RFValue(15), color: 'black'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View
          style={{
            marginTop: '0%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <View style={{width: 25, height: 25, marginRight: '2%'}}>
            <Image
              source={info}
              resizeMode="contain"
              style={{width: '100%', height: '100%', tintColor: colors.light}}
            />
          </View>
          <View style={{marginTop: '5%'}}>
            <Text
              style={{
                fontSize: RFValue(11),
                color: 'black',
                paddingRight: 50,
                marginBottom: '2%',
              }}>
              <Text style={{fontWeight: 'bold'}}>Public</Text>: This activity
              can be discovered by all players on GoPlay
            </Text>
            <Text
              style={{
                fontSize: RFValue(11),
                color: 'black',
                paddingRight: 50,
              }}>
              <Text style={{fontWeight: 'bold'}}>Invites Only</Text>: This
              activity will be restricted to invited players only
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  button: {
    width: '100%',
    height: RFValue(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    width: '100%',
    height: RFValue(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderWidth: 1,
    borderRadius: 5,
  },
});
