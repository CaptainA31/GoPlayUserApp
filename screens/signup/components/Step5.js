import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralInput from '../../../components/GeneralInput';

const Step5 = ({setPassword, setConfirmPassword}) => {
  const [passVisible, setPassVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        height: '100%',
        marginHorizontal: '1%',
      }}>
      <Text style={styles.h3}>Create Password</Text>
      <Text style={styles.subtitle}>
        Your password must include 8 or more characters and a Letter symbol
      </Text>

      <GeneralInput
        label={'Password'}
        visible={passVisible}
        setVisible={value => setPassVisible(value)}
        onChange={text => setPassword(text)}
      />
      <View style={{marginTop: '2%'}}>
        <GeneralInput
          label={'Confirm Password'}
          visible={confirmVisible}
          setVisible={value => setConfirmVisible(value)}
          onChange={text => setConfirmPassword(text)}
        />
      </View>
    </ScrollView>
  );
};

export default Step5;

const styles = StyleSheet.create({
  circle: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: 100,
    borderColor: 'grey',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2: {
    marginLeft: '3%',
    top: '0.5%',
    fontSize: RFValue(17),
    color: 'grey',
  },
  subtitle: {
    color: 'grey',
    textAlign: 'center',
    marginBottom: '2%',
  },

  h3: {
    marginBottom: '1%',
    fontWeight: 'bold',
    fontSize: RFValue(18),
    color: 'grey',
    alignSelf: 'center',
  },
});
