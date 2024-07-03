// SkillsDropdown.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import {colors} from '../../../GlobalStyles';
import {RFValue} from 'react-native-responsive-fontsize';

const SkillsDropdown = ({skillsType, handleSkills, checkMultiple}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: '3%'}}>
      {skillsType.map(item => (
        <TouchableOpacity
          key={item}
          onPress={() => handleSkills(item)}
          style={{width: '32%', marginBottom: '3%'}}>
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
      ))}
    </View>
  );
};

export default SkillsDropdown;

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
