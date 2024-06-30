import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable , Image, Alert} from "react-native";
import calendar from '../../assets/pin.png'
import {LinearGradient} from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import Modal from 'react-native-modal'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { colors } from "../../GlobalStyles";
import { OutlinedTextField } from "rn-material-ui-textfield";

const FilterModal = ({modalVisible , setModalVisible , handleSearchLocation , location ,setLocation }) => {
 

  return (
    <View style={styles.centeredView}>
    <Modal
       swipeDirection = {['down']}
       useNativeDriverForBackdrop
       hasBackdrop ={false}
       animationInTiming = {500}
       animationOutTiming ={500}
       onSwipeComplete = {()=> setModalVisible(false)}
     isVisible={modalVisible}
     style ={{margin : 0}}
      onBackButtonPress={() => {
    
        setModalVisible(false);
      }}
    >
      <Pressable
      onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
               
        <View
        style={styles.modalView}>
          <Text style ={styles.h1}>Select Location</Text>
          <View style = {{flexDirection : "row" , justifyContent : "space-between"}}>
      
          <View style = {{justifyContent : "center" , width  : "100%"}}>
        <View style = {styles.icon}>

<Image 
source = {calendar}
style = {styles.iconImage}
/>
</View>      
      <OutlinedTextField
        lineWidth = {1}
        tintColor = {colors.light}
        inputContainerStyle = {{paddingRight : "20%"}}
        baseColor = "grey"
        textColor = "grey"
        value={location}
        onChangeText= {(event)=> setLocation(event) }
        label = "Location"
        />    
        </View>

 
            </View>

          <Pressable 
          onPress = {()=> handleSearchLocation(location)}
          style = {{width : "100%"}}>
          <LinearGradient 
        colors = {[colors.light , colors.dark]}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style = {styles.button}>
            <Text style={styles.text}>Filter</Text>
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
    height : 250,
    borderWidth : 2,
    borderColor : "#20212429",
    borderRadius: 5,
    paddingHorizontal : "5%",
    paddingVertical : "5%",
    justifyContent : "space-between",
    borderTopLeftRadius : 40,
    borderTopRightRadius : 40,
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
    color : "black",
    fontSize : RFValue(16),

  },
  outlineField : {
    borderColor : colors.light,
    height : RFValue(45),
    borderRadius : 5,
    borderWidth  : 2,
   
  },
  icon : {
    position : "absolute" , alignSelf : "flex-end" ,
    width : "15%",
    height : "85%",
      justifyContent : "center",
      alignItems : "center"
},
iconImage : {
    width : "40%", height : "40%" , resizeMode : "contain",
    bottom : "10%",
    tintColor : colors.light
},
  outlineText : {
    position : "absolute",
    backgroundColor : "white",
    paddingLeft : "2%",
    alignItems : "center",
    justifyContent : "center",
    marginLeft : "5%",
    top : "-20%",
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

export default FilterModal;