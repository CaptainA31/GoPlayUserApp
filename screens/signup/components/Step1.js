import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import backIcon from '../../../assets/arrow.png';

const Step1 = ({setEmail}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        height: '100%',
        marginHorizontal: '1%',
      }}>
      
      <Text style={styles.h3}>Enter Your Email Address</Text>

      <OutlinedTextField
        autoCapitalize="none"
        baseColor={'grey'}
        tintColor={'grey'}
        textColor="grey"
        onChangeText={event => setEmail(event)}
        label={'Email Address'}
      />
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  
  h2: {
    marginLeft: '3%',
    top: '0.5%',
    fontSize: RFValue(17),
    color: 'grey',
  },
  h3: {
    marginBottom: '5%',
    fontSize: RFValue(18),
    color: 'grey',
  },
  
  logo: {
    marginTop: '25%',
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
