import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable, Image, TouchableOpacity} from "react-native";
import Button from '../components/Button'
import {LinearGradient} from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../GlobalStyles";
import Modal from 'react-native-modal'
import { FlatList } from "react-native-gesture-handler";
import { webURL } from "../services/BaseURL";

const SportsModal = ({modalVisible , setModalVisible , sports , handleSelection , checkMultiple}) => {

  return (
    <View style={styles.centeredView}>
    <Modal
       swipeDirection = {['down']}
       useNativeDriverForBackdrop
       hasBackdrop ={false}
       animationInTiming = {300}
       animationOutTiming ={300}
       onSwipeComplete = {()=> setModalVisible(false)}
     isVisible={modalVisible}
     style ={{margin : 0}}
      onBackButtonPress={() => {
    
        setModalVisible(false);
      }}
    >
         <LinearGradient
            style = {{height : "100%", width : "100%" , paddingVertical : "3%" , paddingHorizontal : "5%" }}
            colors={[colors.dark  , colors.light ] }>
        <View
        style={styles.modalView}>
         {
             <FlatList 
             data= {sports}
             numColumns = {2}
             keyExtractor = {item=> item.name}
            showsVerticalScrollIndicator = {false}
             renderItem = {({item , index}) => 
             <View style ={{height : RFValue(120), width : "50%" }}>
             <TouchableOpacity
              onPress = {()=>handleSelection(item)}
              style ={[styles.cardLogo ]}>
                             <View
                               style = {[styles.ballCircle , {borderColor : checkMultiple(item) ? "white" : "#A86DE3" , backgroundColor : checkMultiple(item) ?  "#A86DE3" : null } ]}>
                               <Image
                               source ={{uri : `${webURL}${item.logo}`}}
                               style = {{width :"60%" , height : "60%", resizeMode : "contain" , tintColor :checkMultiple(item) ?  "white" : "#B972FF"}}
                               />
                               </View>
                               <Text style = {{color : checkMultiple(item) ? "white" : "white"}}>{item.name}</Text>
                               </TouchableOpacity>
                               </View>
            }
             />
         }
<Pressable
onPress = {()=> setModalVisible(false)}
style = {{bottom : "4%"}}>
<LinearGradient 
        colors = {["white" , "white"]}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style = {styles.button}>
            <Text style={styles.text}>CLOSE</Text>
        </LinearGradient>
           </Pressable>
        </View>
      
    
      </LinearGradient>
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
    width : "100%",
    height : "100%",
    borderWidth : 2,
    paddingHorizontal : "10%",
    borderColor : "#20212429",
    borderRadius: 5,

  }, 
  cardLogo : {
    alignItems : "center",
    justifyContent : "space-around",
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
    color : colors.light
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
});

export default SportsModal;