import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
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
import info from '../../../assets/info.png';
import SkillsDropdown from '../components/SkillsDropDown'; // Import the SkillsDropdown component

var radio_props = [
  {label: 'Public', value: 0},
  {label: 'Invite Only', value: 1},
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
    return skills === item;
  };

  const checkGender = item => {
    return gender === item;
  };

  const handleInvite = value => {
    setInviteVisible(true);
    setEventType(value);
  };

  const renderPlayer = ({item}) => (
    <View style={styles.playerAvatar}>
      {item.image ? (
        <Image source={item.image} style={styles.playerImage} />
      ) : (
        <View style={styles.emptyAvatar} />
      )}
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  );

  const players = [
    {name: 'Haleema', image: null},
    {name: 'Ahmed', image: null},
    {name: 'Saad', image: null},
    {name: 'Sara', image: null},
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {skillsType.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSkills(item)}
            style={[
              styles.button,
              checkMultiple(item) && styles.selected,
            ]}>
            <Text style={{color: checkMultiple(item) ? 'white' : 'black'}}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Players</Text>
        <View style={styles.confirmTitle}>
          <Text style={styles.sectionsubTitle}>Total Players</Text>
          <Text style={styles.sectionsubTitle}>Confirmed Players</Text>
        </View>
        
        <View style={styles.inputRow}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="black"
            keyboardType="numeric"
            value={total}
            containerStyle={styles.inputContainer}
            // inputContainerStyle={styles.inputInnerContainer}
            onChangeText={event => setTotal(event)}
            // label="Total Players"
          />
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="black"
            keyboardType="numeric"
            value={confirmed}
            containerStyle={styles.inputContainer}
            // inputContainerStyle={styles.inputInnerContainer}
            onChangeText={event => setConfirmed(event)}
            // label="Confirmed Players"
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Age</Text>
        <RangeSlider setAge={setAge} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.skillsContainer}>
          {genderType.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGender(item)}
              style={[
                styles.button,
                checkGender(item) && styles.selected,
              ]}>
              <Text style={{color: checkGender(item) ? 'white' : 'black'}}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Event Type</Text>
        <View style={styles.radioContainer}>
          <RadioForm formHorizontal={true} animation={true}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
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
                  labelStyle={{fontSize: RFValue(12), color: 'black'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View style={styles.infoContainer}>
          <Image source={info} resizeMode="contain" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Public</Text>: This activity
              can be discovered by all players on GoPlay
            </Text>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Invite Only</Text>: This
              activity will be restricted to invited players only
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.playersContainer}>
        <FlatList
          data={players}
          horizontal
          renderItem={renderPlayer}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  screen: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: 10,
  },
  sectionsubTitle: {
    fontSize: RFValue(12),
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
  },
  confirmTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: RFValue(12),
    marginBottom: 2,
  },
  sectionContainer: {
    marginTop: '4%',
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
    width: "25%",
  },
  button: {
    width: '120%',
    height: RFValue(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.dark,
    marginHorizontal: 5,
    padding: 5,
  },
  selected: {
    backgroundColor: colors.light,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  inputContainer: {
    width: '49%',
    height: RFValue(45),
  },
  inputInnerContainer: {
    paddingRight: '20%',
    height: RFValue(45),
  },
  radioContainer: {
    marginTop: '2%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  infoIcon: {
    width: 25,
    height: 25,
    tintColor: colors.light,
    marginRight: '2%',
    marginTop: -40
  },
  infoText: {
    fontSize: RFValue(11),
    color: 'black',
    paddingRight: 50,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  playerAvatar: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  playerName: {
    fontSize: RFValue(12),
    marginTop: 5,
  },
  viewAllText: {
    color: colors.light,
    marginLeft: 10,
  },
});
