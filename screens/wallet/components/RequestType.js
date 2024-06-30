import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View , Modal, Dimensions, TextInput, Image, TouchableOpacity, ImageBackground, Alert, Pressable} from 'react-native'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { capitalizeFirstLetter, colors, imageStyle } from '../../../GlobalStyles';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import searchIcon from '../../../assets/search.png'
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import { FlatList } from 'react-native-gesture-handler';
import { getAllUser } from '../../../services/signin';
import { webURL } from '../../../services/BaseURL';
import calendar from '../../../assets/calendar.png';
import clock from '../../../assets/clock.png';
import profile from '../../../assets/profile.png';
import { deleteGroups, getAllGroups, getMyGroups, getOtherGroups, joinGroup } from '../../../services/Conversation';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import TransferReason from './TransferReason';
import { acceptRequest, declineRequest, myRequests, requestFunds } from '../../../services/wallet';
import AlertBox from '../../../components/AlertBox';

let globalSelectedUser = []

const FirstRoute = () => {
  const [convo , setConvo] = useState([])
  const [users , setUsers] = useState([])
  const [allUsers , setAllUsers] = useState([])
  const [selectedUser , setSelectedUser] = useState([])
  const [loading  , setLoading ] = useState(false)
  const userDetail = useSelector(state => state?.userDetail.userDetail)
  const [transferModal , setTrasnferModal] = useState(false)
  const [reason , setReason] = useState()
  const [amout , setAmount] = useState()
  const [message , setMessage] = useState('')
  const [alertBox , setAlertBox] = useState(false)
  const [title , setTitle] = useState("")
    


    useEffect(()=> {
        getAllUser().then((res)=> {
            setUsers(res.data.users)
            setAllUsers(res.data.users)
         })
    }, [])


    const handleSelect = (item)=> { 
             setTrasnferModal(true)
            setSelectedUser(item)
    }

  const handleSearch = (event)=> { 
    const search = users.filter(item => item.firstName.toLowerCase().includes(event.toLowerCase()) || item.lastName.toLowerCase().includes(event.toLowerCase()))
    setAllUsers(search)
  }

  
  const handleDone = ()=> {


        if (reason && amout) { 
            setTrasnferModal(false)
            setLoading(true)

            let data = { 
                requestTo : selectedUser._id,
                reason : reason,
                amount : amout,
               }
               requestFunds(data).then((res)=> {
                    setLoading(false)
                    setTitle("Success")
                    setAlertBox(true)
                    setMessage(res.body.message)
                    return 
               }).catch(()=> {
                setLoading(false)
               })
        }else { 
        setLoading(false)
        setTitle("Error")
        setAlertBox(true)
        setMessage("Please provide amount and reason")
          return
      }



      
}
     
    
  
  return  (
    
    <View style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
        <Loader value={loading} />

        <Pressable
      // onPress={()=> setModalVisible(false)}
      style={styles.centeredView}>
        <View
        style={styles.modalView}>
 
            <View style = {styles.searchBar}>
            <TextInput
            placeholder = {"Search for users"}
            onChangeText = {handleSearch}
            style={{width : "90%" , color : 'black' }}
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
                onPress = {()=> handleSelect(item)}
                style = {[styles.chatContainer]}>
                    <View style = {{flexDirection : "row"}}>
                        <View style ={{width : "15%" , marginLeft : "3%"}}>
                        <ImageBackground
                    source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                    style = {styles.userPic}>
                        </ImageBackground>

                        </View>
                        <View style = {{width : "75%", justifyContent : "center" }}>
                            <Text style = {{fontSize : RFValue(13) , fontWeight : "bold"}}>{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</Text>
                            <Text style = {{fontSize : RFValue(13)}}>{capitalizeFirstLetter(item.gender)} | {item.age}</Text>
                        </View>
                 
                    </View>
                    <TouchableOpacity 
                    onPress={()=> handleSelect(item)}
                    style= {styles.request}>
                        <Text style = {{color : "white"}}>Request</Text>
                    </TouchableOpacity>
                </View>             
              )
            }}
            /> 

        </View>

        <TransferReason 
              handleDone = {handleDone}
              reason = {reason} setReason = {setReason}
              amount = {amout}  setAmount = {setAmount}
              setModalVisible={setTrasnferModal}
              modalVisible={ transferModal} 
              />
      </Pressable>    
    </View>
  )
};
   
  const SecondRoute = () => {
    const [myRequest , setMyRequest] = useState([])
    const [loading , setLoading] = useState(false)
    const userDetail = useSelector(state => state?.userDetail.userDetail)
    const [message , setMessage] = useState('')
    const [alertBox , setAlertBox] = useState(false)
    const [title , setTitle] = useState("")

    
    useEffect(()=> { 
        myRequests().then((res)=> { 
            setMyRequest(res.data.request)
        })
    }, [])

    const handleAccept =(item)=> { 
        setLoading(true)
            let data = { 
                requestId : item._id,
                reciever : item.requestFrom._id,
                reason : item.reason,
                amount : item.amount,
            }

            if (userDetail.wallet < parseInt(item.amount)){
              setLoading(false)
              setTitle("Error")
              setAlertBox(true)
              setMessage("you dont have enough funds to proceed this request")
            }

            acceptRequest(data).then((response)=> { 
              setTitle("Success")
              setAlertBox(true)
              setMessage(response.body.message)
              
                myRequests().then((res)=> { 
                    setLoading(false)
                    setMyRequest(res.data.request)
                }).catch(()=> {
                    setLoading(false)

                })
            })    
    }

    const handleDecline =(item)=> { 
        setLoading(true)
            let data = { 
                requestId : item._id,
                reciever : item.requestFrom._id,
                reason : item.reason,
                amount : item.amount,
            }

            declineRequest(data).then((response)=> { 
                Alert.alert("Success" , response.data.message)
                myRequests().then((res)=> { 
                    setLoading(false)
                    setMyRequest(res.data.request)
                }).catch(()=> {
                    setLoading(false)

                })
            })    
    }
    
    return  (
      
      <View style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
          <Loader value={loading} />
          <AlertBox 
            alertBox={alertBox}
             setAlertBox={setAlertBox} 
            title={title}
            message={message}
            />

        <FlatList 
        data={myRequest}
        contentContainerStyle = {{paddingBottom : 20}}
        renderItem={({item , index})=> {
            return (
                <View style ={styles.requestContainer}>
                <View style={{height :"70%" , flexDirection : "row"}}>
              

                    <View style = {{width : "25%" , alignItems : "center" , justifyContent  :"center" }}>
                        <View style={styles.displayPic}>
                        <Image
                    source = {item.requestFrom.profilePic == "" ? profile : {uri : `${webURL}${item.requestFrom.profilePic}`}}
                    style = {{width :"100%" , height : "100%" , resizeMode : "contain"}}>
                        </Image>
                            </View>
                        </View>

                        <View style={{width : "70%" , paddingVertical : "3%" , justifyContent : "space-between" }}>
                            <Text>{capitalizeFirstLetter(item.requestFrom.firstName)} {capitalizeFirstLetter(item.requestFrom.lastName)}</Text>
                            <Text> {capitalizeFirstLetter(item.requestFrom.gender)} | {item.requestFrom.age}</Text>
                            <View style={{flexDirection : "row" , justifyContent : "space-between"}}>
                               <View style={{flexDirection : "row" , alignItems : "center"}}>
                                   <View style= {{height : 15 , width :15 ,  marginRight : 5 }}>
                                       <Image
                                       source={calendar} 
                                       style={{width: "100%" , height : "100%" , resizeMode : "contain"}}
                                       />
                                       </View>
                                       <Text >{moment.utc(item.createdAt).format('DD-MMM-YYYY')}</Text>
                                        <Text> | </Text>
                                        <View style= {{height : 15 , width :15 ,  marginRight : 5 }}>
                                       <Image
                                       source={clock} 
                                       style={{width: "100%" , height : "100%" , resizeMode : "contain"}}
                                       />
                                       </View>
                                       <Text>{moment(item.createdAt).format('hh:mm A')}</Text>
                            </View>
                                </View>
                                <View style={{flexDirection : "row" , justifyContent : "space-between" , alignItems : "center"}}>
                                <Text>{item.reason}</Text>
                                <View style={{  backgroundColor : colors.shade , borderRadius : 5}}> 
                                  <Text style={{color : "black" , paddingHorizontal : "2%", paddingVertical : "2%" }}> PKR {item.amount}</Text>
                               </View>
                                    </View>

                        </View>
                    </View>

                    <View style={{height : "30%" , flexDirection : "row" , justifyContent :"space-between"}}>
                       <TouchableOpacity 
                       onPress={()=> handleAccept(item)}
                       style={{height : "100%" , width : "49.7%" , backgroundColor : colors.light , justifyContent: 'center', alignItems : 'center'}}>
                        <Text style={{color : "white"}}>Accept</Text>
                       </TouchableOpacity>

                       <TouchableOpacity 
                       onPress={()=> handleDecline(item)}
                       style={{height : "100%" , width : "49.7%" , backgroundColor : colors.light , justifyContent: 'center', alignItems : 'center'}}>
                       <Text style={{color : "white"}}>Decline</Text>
                       </TouchableOpacity>
                        </View>
                </View>
            )
        }}
        />
      </View>
    )
  }
   
  const initialLayout = { width: Dimensions.get('window').width };

const RequestTypes = ({modalVisible , setModalVisible  , setLocation , navigation, setSelectedUser}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Request Funds' },
      { key: 'second', title: 'Recieved Requests' },
    ]);


    const renderScene = SceneMap({
        first:  FirstRoute,
        second: SecondRoute
      });

      const handleInvite = ()=> { 
        setModalVisible(false)
        setSelectedUser(globalSelectedUser)
      }

    return (

                <View style= {{backgroundColor : "white", height : "100%"}}>
                    <TabView
                   navigationState={{ index, routes }}
                   renderScene={renderScene}
                     onIndexChange={setIndex}
                      initialLayout={initialLayout}
                      renderTabBar={props => <TabBar {...props}
                      indicatorStyle={{ backgroundColor: colors.light }}
                      style={{ backgroundColor: "white" }}
                      renderLabel={({ route, focused, color }) => (
                        <Text style={{ color : "black", margin: 8 }}>
                          {route.title}
                        </Text>
                      )}
                      />}

                      />
   
                </View>
    
    )
}

export default RequestTypes

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width : "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      scene: {
        flex: 1,
      },
      request: {
        backgroundColor : colors.light,
        height : "30%",
        justifyContent : "center" , alignItems  : "center"
        
      },
      searchBar : {
        borderWidth : 1 ,
        borderColor : "lightgrey",
        borderRadius  : 4,
        height : RFValue(45),
        flexDirection  :"row"
      },
      userContainer : {
          height : RFValue(65),
          flexDirection : "row",
          marginTop : 12,
          borderBottomColor : "lightgrey",
          borderBottomWidth : 1
      },
      circle : {
        width : RFValue(50),
        height : RFValue(50),
        borderRadius : 100,
        overflow : "hidden",
    },
    displayPic : {
        height : 65,
        width  : 65,
        borderRadius : 50, overflow : "hidden"
    },
    requestContainer : {
        borderColor : colors.light,
        borderWidth : 1 ,
        height : 160,
        borderRadius : 10,
        marginTop : 15,
        overflow :  "hidden"
    },
    members : { 
        backgroundColor : "#eeeeee",
        width : "80%",
        height  :"50%",
        borderRadius : 5,
        justifyContent : "center", 
        alignItems :"center"
    },
    redIcon: {
        paddingVertical : "4%",
        backgroundColor: "#FF5050",
        borderRadius : 5,
        height: RFValue(20),
        width : RFValue(20),
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5%"

    },
    
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
    height :RFValue(90),
    borderColor : colors.light,
    borderWidth : 1,
    borderRadius : 10,
    marginBottom : 20, 
    overflow : "hidden",
    justifyContent : "space-between",
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
})
