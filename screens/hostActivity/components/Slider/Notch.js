import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Notch = props => {
  return (
    <View style={styles.root} {...props}>
      <Text style={{color : "red"}}>23</Text>
    </View>
  );
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
