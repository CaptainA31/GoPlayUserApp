import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, Pressable ,Image ,  TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Header from '../../components/Header'
import { capitalizeFirstLetter, colors, screen } from '../../GlobalStyles'
import profile from '../../assets/profile.png'
import { webURL } from '../../services/BaseURL'
import searchIcon from '../../assets/search.png'
import trash from '../../assets/kickUser.png';
import Button from '../../components/Button'
import { kickMember } from '../../services/Conversation'
import AlertBox2 from '../../components/AlertBox2'

const ViewAndEditMembers = ({navigation , route}) => {
    const [allMembers , setAllMembers ] = useState(route.params.allMembers)
    const {convoId} = route.params
    const [allUsers , setAllUsers] = useState(allMembers)
    const [message , setMessage] = useState('')
    const [alertBox2 , setAlertBox2] = useState(false)
    const [title , setTitle] = useState("")
    const [back, setBack]= useState()

    useEffect(() => {
       setAllUsers(allMembers)
    }, [allMembers])

    const handleSearch = (event)=> { 
        const search = allMembers.filter(item => item.firstName.toLowerCase().includes(event.toLowerCase()) || item.lastName.toLowerCase().includes(event.toLowerCase()))
        setAllUsers(search)
    }

    const handleRemove= (item)=> { 
        console.log(item)
        setTitle("Kick Member?")
        setAlertBox2(true)
        setMessage( `Are you sure to remove ${item.firstName} from the group?`)
        setBack(item._id)
      
    }

    const handleAbort = ()=> {
      let data = {
        convoId : convoId,
        member  : back
    }
    kickMember(data).then(()=> {
        const deletedList =  allMembers.filter(element => element._id !== back)
        setAllMembers(deletedList)
        setAlertBox2(false)
    }).catch(()=> {
      setAlertBox2(false)
    })
    
    }


    return (
        <View style={screen}>
            <Header heading={'Members'} 
            onBack={()=> navigation.pop()} />
                   <AlertBox2 
            alertBox={alertBox2}
            setAlertBox={setAlertBox2} 
            title={title}
            message={message}
            onAbort={handleAbort}
            cancel = {"No"} success={"Yes"}
            />
                 <Pressable
      // onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
        <View
        style={styles.modalView}>
            <View style = {styles.searchBar}>
            <TextInput
            placeholder = {"Search for users"}
            onChangeText = {handleSearch}
            style={{width : "90%" }}
            />
            <View style={{justifyContent : "center" , alignItems : "center", height : "100%" , width : "10%"}}>
                <Image 
                 source={searchIcon}
                 style = {{width : "50%",height : "50%" ,resizeMode :"contain" ,tintColor : colors.light}}
                  />
                 </View>
           </View>
            <FlatList 
        data = {allUsers}
        style = {{marginTop : 10 , paddingHorizontal : "3%"}}
        keyExtractor = {item => item.userName}
        renderItem  = {({item, index}) => {
            return (
                <View
                // onPress = {()=> handleSelect(item)}
                style = {styles.chatContainer}>
                    <View style = {{flexDirection : "row"}}>
                        <View style ={{width : "15%"}}>
                        <ImageBackground
                    source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                    style = {styles.userPic}>
                        </ImageBackground>

                        </View>
                        <View style = {{width : "65%", justifyContent : "space-evenly"}}>
                            <Text style = {{fontSize : RFValue(13) , fontWeight : "bold"}}>{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</Text>
                            <Text>{item.lastMessage}</Text>
                        </View>
                        <View style = {{width : "20%" , alignItems : "center" , justifyContent : "space-around"}}>
                        <TouchableOpacity 
                        onPress={()=> handleRemove(item)}
                        style = {styles.redIcon}>
                        <Image
                         source = {trash}
                            style = {{tintColor : colors.light, width : "100%" , height : "100%" , resizeMode : "contain"}}/>
                          
                            </TouchableOpacity>
                         
                       
                        </View>
                    </View>
                    <View style= {styles.divider}>
                    </View>
                </View>             
              )
            }}
            /> 

        </View>
    
      </Pressable>
        </View>
    )
}

export default ViewAndEditMembers

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
      redIcon: {
        backgroundColor: colors.shade,
        borderRadius : 5,
        height: RFValue(30),
        width : RFValue(30),
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5%"

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
})
