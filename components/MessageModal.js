import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable} from "react-native";
import Button from './Button';
import {LinearGradient} from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../GlobalStyles";
import Modal from 'react-native-modal'

const MessageModal = ({modalVisible , setModalVisible , message }) => {


  return (
    <View style={styles.centeredView}>
    <Modal
       swipeDirection = {['down']}
       useNativeDriverForBackdrop
       hasBackdrop ={false}
       animationInTiming = {1000}
       animationOutTiming ={1000}
       onSwipeComplete = {()=> setModalVisible(false)}
     isVisible={modalVisible}
     style ={{margin : 0}}
      onBackButtonPress={() => {
    
        setModalVisible(false);
      }}
    >
      <Pressable
      // onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
        <View
        style={styles.modalView}>
          <Text style ={styles.h1}>{message}!</Text>
          <Pressable 
          onPress = {()=> setModalVisible(false)}
          style = {{width : "30%"}}>
          <LinearGradient 
        colors = {[colors.light , colors.dark]}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style = {styles.button}>
            <Text style={styles.text}>CLOSE</Text>
        </LinearGradient>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
    </View>
  );
}
const styles = StyleSheet.create({

centeredView: {
    flex: 1,
    width : "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width : "99%",
    height : "20%",
    borderWidth : 2,
    borderColor : "#20212429",
    borderRadius: 5,
    alignItems: "center",
    justifyContent : "space-around",
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    shadowColor: "#000",
    shadowOffset: {
  width: 2,
  height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 19.46,
    elevation: 4,
  }, 
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  message : {
      color : "black",
      fontSize : RFValue(16),
      letterSpacing : 1,
      fontWeight :"bold",
      textAlign: "center"      
  },
  h1 : {
    color : colors.light,
    fontSize : RFValue(18),
    fontWeight : "bold",

  },
  button : {
    height : RFValue(40),
    width : "100%",
    justifyContent : "center",
    alignItems : "center",
    borderRadius : 4
},
text : {
    fontSize : RFValue(16),
    color : "white"
},
});

export default MessageModal;