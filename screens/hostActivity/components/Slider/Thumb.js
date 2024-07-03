import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../../../GlobalStyles';

const THUMB_RADIUS = 12;

const Thumb = ({text , low}) => {
  console.log(text)
  return (
    <View style={styles.root}>
      {/* <Text style = {{fontSize : RFValue(10) , color : "white" , fontWeight : "bold"}}>{text}</Text> */}
      <Text style = {{fontSize : RFValue(10) , color : "white" , fontWeight : "bold"}}>{text}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    justifyContent  :"center",
    alignItems  : "center",
    backgroundColor: colors.light,
  },
});

export default memo(Thumb);
