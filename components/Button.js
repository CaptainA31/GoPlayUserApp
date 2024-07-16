import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../GlobalStyles';

const Button = ({text}) => {
  return (
    // <LinearGradient
    //   colors={[colors.light, colors.dark]}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 0}}
    //   style={styles.button}>
    //   <Text style={styles.text}>{text}</Text>
    // </LinearGradient>
    <View style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
  },
  text: {
    fontSize: RFValue(16),
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});

export default Button;
