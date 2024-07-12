import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../GlobalStyles';
import back from '../assets/arrow.png';
import {RFValue} from 'react-native-responsive-fontsize';
const Header = ({onBack, heading, text, onTextPress}) => {
  return (
    // <LinearGradient
    // colors = {[colors.light , "#28133D"]}
    // style = {styles.container}>
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: '5%',
        }}>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Image source={back} style={styles.backlogo} />
          </TouchableOpacity>
          <Text style={styles.text}>{heading}</Text>
        </View>
        {text ? (
          <TouchableOpacity onPress={onTextPress} style={{top: '0.5%'}}>
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    backgroundColor: 'white',
    paddingLeft: '3%',
    justifyContent: 'center',
    // borderBottomLeftRadius: RFValue(25),
    // borderBottomRightRadius: RFValue(25),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
  },
  backButton: {
    paddingTop: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '5%',
    paddingLeft: '5%',
    // backgroundColor: 'black',
  },
  backlogo: {
    resizeMode: 'center',
    width: RFValue(15),
    height: RFValue(15),
    marginBottom: 10
  },
  text: {
    marginLeft: '5%',
    fontSize: RFValue(26),
    color: 'black',
    top: '0.5%',
    fontWeight: 'bold',
  },
});

export default Header;
