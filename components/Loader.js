import React from 'react';
import {View , ActivityIndicator , Modal } from 'react-native'; 
import { colors } from '../GlobalStyles';

const Loader = ({value}) => {

    return (
   
        <Modal
           animationType="fade"
           transparent={true}
           visible={value}
        >
          <View style = {{alignItems : "center" , justifyContent : "center" , flex : 1 , backgroundColor: "#b3b3b338"}}>
          <ActivityIndicator size = {"large"} color = {colors.light} />
          </View>
        </Modal>
    )
}

export default Loader;