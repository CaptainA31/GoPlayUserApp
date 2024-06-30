import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';

const Step2 = ({setFirstName, setLastName}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        height: '100%',
        marginHorizontal: '1%',
      }}>
      <Text style={styles.h3}>What's Your Name?</Text>

      <OutlinedTextField
        autoCapitalize="none"
        baseColor={'grey'}
        tintColor={'grey'}
        textColor="grey"
        onChangeText={event => setFirstName(event)}
        label={'First Name'}
      />
      <View style={{marginTop: '2%'}}>
        <OutlinedTextField
          autoCapitalize="none"
          baseColor={'grey'}
          tintColor={'grey'}
          textColor="grey"
          onChangeText={event => setLastName(event)}
          label={'Last Name'}
        />
      </View>
    </View>
  );
};

export default Step2;

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
  h3: {
    marginBottom: '5%',
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
