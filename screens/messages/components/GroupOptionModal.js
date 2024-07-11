import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable, Image, TouchableOpacity, ImageBackground, TextInput} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import profile from '../../../assets/profile.png';
import { RFValue } from "react-native-responsive-fontsize";
import Modal from 'react-native-modal'
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../../GlobalStyles";
import Header from "../../../components/Header";
import { webURL } from "../../../services/BaseURL";


const GroupOption = ({modalVisible , setModalVisible, users ,handleCheckBlock , handleLeaveGroup ,handleDelete ,  handleBlock }) => {
  const [allUsers , setAllUsers] = useState(users)

 

  return (
    <Modal
       swipeDirection = {['down']}
       useNativeDriverForBackdrop
       hasBackdrop ={true}
       animationInTiming = {300}
       animationOutTiming ={300}
       onSwipeComplete = {()=> setModalVisible(false)}
       isVisible={modalVisible}
       backdropOpacity = {0.7}
       backdropColor  = {"black"}
       style ={{margin : 0 , padding : 0 }}
       onBackButtonPress={() => {
        setModalVisible(false);
      }}
    >
      <Pressable
      onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
        <View
        style={styles.modalView}>
    
          <TouchableOpacity
          onPress = {handleLeaveGroup}
          style={[styles.field , {borderBottomWidth  :0}]}>
          <Text>Leave Group</Text>
          </TouchableOpacity>
        </View>
    
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  searchBar : {
    borderWidth : 1 ,
    borderColor : "lightgrey",
    borderRadius  : 4,
    height : RFValue(45),
    flexDirection  :"row",
    marginHorizontal  :"3%",
    marginTop : 15
  },
centeredView: {
    height: "100%",
    width : "100%",
    // backgroundColor : "#00000063",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width : "100%",
    height : "10%",
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15,
    justifyContent : "center",
    paddingHorizontal : "2%"
    // borderWidth : 2,
    // borderColor : "#20212429",
  }, 
  field : {
        height : "40%",
        borderBottomColor : "lightgrey",
        borderBottomWidth : 1,
        justifyContent : "center"
  },
  cardLogo : {
    height : RFValue(90),
    width : RFValue(100),
    backgroundColor : "white",
    borderRadius : 4,

    shadowColor: "#000",
    alignItems : "center",
    justifyContent : "space-around",
    marginRight : "25%",
    shadowOffset: {
    width: 4,
    height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
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
    height : RFValue(45),
    width : "100%",
    justifyContent : "center",
    alignItems : "center",
    borderRadius : 4,
},
text : {
    fontSize : RFValue(16),
    color : "white"
},

ballCircle : {
    height : RFValue(70),
    width : RFValue(70),
    borderRadius : 100,
    borderColor : colors.light,
    borderWidth : 1,
    alignItems : "center",
    justifyContent : "center",
    overflow : "hidden"
},
messageContainer : {
    height : "80%" ,
    padding : "2%", paddingHorizontal : "5%",
    backgroundColor : "red"
},
chatContainer : {
height :RFValue(70)
},
divider : {
    height : RFValue(1),
    alignSelf : "center" ,
     width : "90%", 
     backgroundColor  :"lightgrey",
     marginTop : "2%"
},
userPic : {
    height : RFValue(40),
    width : RFValue(40),
    borderRadius : 100,
    marginTop : "15%",
    marginBottom : "10%",
    overflow : "hidden"
},
unRead : {
    backgroundColor : colors.light,
    paddingHorizontal : "20%",
    paddingVertical : "8%",
    borderRadius : 10,
    justifyContent : "center",
    alignItems : "center"
}
});

export default GroupOption;