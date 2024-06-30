import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import eye from '../assets/visibility.png';
import {colors} from '../GlobalStyles';

const GeneralInput = ({
  visible,
  setVisible,
  tintColor,
  color,
  onChange,
  label,
  secureText,
  editable,
  ...props
}) => {
  return (
    <View
      style={{
        marginTop: '2%',
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'grey',
      }}>
      <TextInput
        placeholder={label}
        onChangeText={event => onChange(event)}
        style={{
          marginHorizontal: 6,
          fontSize: 16,
          flex: 1,
          color:'grey'
        }}
        secureTextEntry={secureText ? visible : false}
        // value={value}
        editable={editable}
        {...props}
      />
      {secureText && (
        <TouchableOpacity
          accessible={true}
          onPressIn={() => setVisible(false)}
          onPressOut={() => setVisible(true)}
          style={{
            width: RFValue(40),
            height: RFValue(40),
            zIndex: 1000,
            justifyContent: 'center',
          }}
          // onChange={event => onChange(event)}
          >
          <Image
            source={eye}
            style={[
              styles.iconImage,
              {tintColor: color ? colors.light : 'white'},
            ]}
          />
        </TouchableOpacity>
      )}
      {/* {color ? (
      ) : (
        // <OutlinedTextField
        //   autoCapitalize="none"
        //   baseColor={'grey'}
        //   tintColor={colors.light}
        //   textColor="grey"
        //   onChangeText={event => onChange(event)}
        //   secureTextEntry={visible}
        //   label={label}
        // />
        // <OutlinedTextField
        //   autoCapitalize="none"
        //   baseColor={'white'}
        //   tintColor={'white'}
        //   textColor="white"
        //   onChangeText={event => onChange(event)}
        //   secureTextEntry={visible}
        //   label={label}
        // />
        <TextInput
          placeholder="Password"
          onChangeText={event => onChange(event)}
          style={{
            // backgroundColor: 'red'
            borderBottomWidth: 1,
            borderColor: 'red',
            marginHorizontal: 6,
            fontSize: 28,
          }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    bottom: '10%',
    tintColor: 'white',
  },
});

export default GeneralInput;
