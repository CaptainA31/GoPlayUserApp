import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable , TouchableOpacity} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Modal from 'react-native-modal'
import { colors } from "../../../GlobalStyles";
import { OutlinedTextField } from "rn-material-ui-textfield";
import Button from "../../../components/Button";

const GroupName = ({modalVisible ,handleDone ,  name , setName , setModalVisible}) => {
  return (
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
          <View style={styles.modalView}>
              <View>
            <View style={{marginTop : 5}}>
            <OutlinedTextField
                lineWidth = {1}
                tintColor = {colors.light}
                baseColor = "grey"
                textColor = "grey"
                value = {name}
                containerStyle = {{height : RFValue(45) }}
                inputContainerStyle = {{paddingRight : "20%" , height : RFValue(45)}}
                onChangeText = {(event)=> setName(event)}
                label = "Group Name"
                />
            </View>
              </View>

              <TouchableOpacity
              onPress={handleDone}
              style={{height : 45 , width : "90%" , alignSelf : "center"}}>
                    <Button text={'Done'} />
              </TouchableOpacity>
     
       
          </View>
      </Pressable>
    </Modal>
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
    height :200,
    borderWidth : 2,
    borderColor : "#20212429",
    borderBottomColor : "white",
    borderRadius: 5,
    paddingHorizontal : "5%",
    justifyContent : "space-between",
    paddingVertical : "4%",
    paddingTop : "10%",
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 19.46,
    elevation: 4,
  }, 
  bar : {
        width : "50%",
        height : RFValue(1),
        backgroundColor : 'grey',
        marginTop : RFValue(3),
        borderRadius : 20
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
    marginBottom : "5%"

  },
  button : {
    height : RFValue(45),
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

export default GroupName;