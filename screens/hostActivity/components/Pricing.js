import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {colors} from '../../../GlobalStyles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const Pricing = ({setPrice, price, paymentType, setPaymentType}) => {
  const selected = [colors.light, colors.dark];
  const notSelected = ['#f8f8f8', '#f8f8f8'];
  const radio_props = [
    {label: 'Cash', value: 'cash'},
    {label: 'Wallet', value: 'wallet', disabled: true},
  ];

  return (
    <View style={{paddingHorizontal: '3%'}}>
      <View>
        <Text style={{fontSize: RFValue(14), fontWeight: 'bold'}}>
          Cost Per Player
        </Text>
        <View style={{marginTop: '2%'}}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="black"
            keyboardType="numeric"
            value={price}
            containerStyle={{height: RFValue(45)}}
            // inputContainerStyle={{paddingRight: '20%', height: RFValue(45)}}
            onChangeText={event => setPrice(event)}
            // label="350 PKR"
          />
        </View>
      </View>

      <View style={{marginTop: '4%'}}>
        <Text style={{fontSize: RFValue(14), fontWeight: 'bold'}}>
          Payment Type
        </Text>
        <View style={{marginTop: '5%', flexDirection: 'row'}}>
          <RadioForm formHorizontal={true} animation={true}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={paymentType === obj.value}
                  onPress={() => {
                    if (!obj.disabled) {
                      setPaymentType(obj.value);
                    }
                  }}
                  borderWidth={1}
                  buttonInnerColor={colors.light}
                  buttonOuterColor={
                    paymentType === obj.value ? colors.light : 'grey'
                  }
                  buttonSize={12}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: '10%'}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={() => {
                    if (!obj.disabled) {
                      setPaymentType(obj.value);
                    }
                  }}
                  labelStyle={{
                    fontSize: RFValue(15),
                    color: obj.disabled ? 'grey' : 'black',
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>
    </View>
  );
};

export default Pricing;

const styles = StyleSheet.create({
  button: {
    height: RFValue(45),
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
});
