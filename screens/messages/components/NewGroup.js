import React, { useState } from "react";
import {Text, View , StyleSheet, Pressable, Image, TouchableOpacity, ImageBackground, TextInput} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import profile from '../../../assets/profile.png';
import { RFValue } from "react-native-responsive-fontsize";
import Modal from 'react-native-modal'
import { FlatList } from "react-native-gesture-handler";
import { capitalizeFirstLetter, colors } from "../../../GlobalStyles";
import Header from "../../../components/Header";
import { webURL } from "../../../services/BaseURL";


const NewGroup = ({modalVisible , setModalVisible, users , handleSelect }) => {
  const [allUsers , setAllUsers] = useState(users)
  const [selectedUser , setSelectedUser] = useState([])
  const [groupName , setGroupName] = useState()

    const handleSearch = (event)=> { 
        console.log(event)
        const search = users.filter(item => item.firstName.includes(event) || item.lastName.includes(event))
        setAllUsers(search)
    }

    const handleSelection = (item)=> {
        let array =  selectedUser.find(current => current == item._id )
        if (array){
          let data = selectedUser.filter(current => current !== item._id )
          return setSelectedUser(data)
        }
        setSelectedUser([...selectedUser  , item._id])
      }

      const checkMultiple = (item)=> {
        if(selectedUser.length == 0) {
            return false
        }else{
          let data = selectedUser.find(element => element == item._id)
          if (data){
              return true
          }else {
              return false
          }
      }
    }

    const onComplete = ()=> { 
      let data = {
        members: selectedUser,
        groupName : groupName
      }
      handleSelect(data)
    }


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
       style ={{margin : 0 , padding : 0 }}
       onBackButtonPress={() => {
         onComplete()
        setModalVisible(false);
      }}
    >
      <Pressable
      // onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
        <View
        style={styles.modalView}>
            <Header heading = {"Select User"} />
            <View style = {styles.searchBar}>
            <TextInput
            placeholder = {"Search for users"}
            onChangeText = {handleSearch}
            style={{width : "90%" }}
            />
            <View style={{justifyContent : "center" , alignItems : "center"}}>
            <Text>icon</Text>
            </View>
           </View>

           <View style = {styles.searchBar}>
            <TextInput
            placeholder = {"Group Name"}
            onChangeText = {(event)=> setGroupName(event)}
            style={{width : "90%" }}
            />
            <View style={{justifyContent : "center" , alignItems : "center"}}>
            <Text>icon</Text>
            </View>
           </View>
            <FlatList 
        data = {allUsers}
        style = {{marginTop : 10 , paddingHorizontal : "3%"}}
        keyExtractor = {item => item.userName}
        renderItem  = {({item, index}) => {
            return (
                <TouchableOpacity
                onPress = {()=> handleSelection(item)}
                style = {styles.chatContainer }>
                    <View style = { checkMultiple(item) ?  {flexDirection : "row" , backgroundColor : "lightgrey" } : {flexDirection : "row"}}>
                        <View style ={{width : "15%"}}>
                        <ImageBackground
                    source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                    style = {styles.userPic}>
                        </ImageBackground>

                        </View>
                        <View style = {{width : "75%", justifyContent : "space-evenly"}}>
                            <Text style = {{fontSize : RFValue(13) , fontWeight : "bold"}}>{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</Text>
                            <Text>{item.lastMessage}</Text>
                        </View>
                        <View style = {{width : "10%" , alignItems : "center" , justifyContent : "space-around"}}>
                            <Text>{item.time}</Text>
                       
                        </View>
                    </View>
                    <View style= {styles.divider}>
                    </View>
                </TouchableOpacity>             
              )
            }}
            /> 

        </View>
    
      </Pressable>
    </Modal>
    </View>
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
    backgroundColor : "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width : "100%",
    height : "100%",
    // borderWidth : 2,
    // borderColor : "#20212429",
  }, 
  cardLogo : {
    height : RFValue(110),
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

export default NewGroup;