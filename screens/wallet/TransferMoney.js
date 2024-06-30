import React, { useState , useEffect, useRef } from 'react'
import { Alert, FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import { capitalizeFirstLetter, colors, screen } from '../../GlobalStyles'
import addIcon from '../../assets/wallet.png'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../services/signin'
import NewConvo from '../messages/components/NewConvo'
import profile from '../../assets/profile.png';
import searchIcon from '../../assets/search.png'
import { webURL } from '../../services/BaseURL'
import { RFValue } from 'react-native-responsive-fontsize'
import TransferReason from './components/TransferReason'
import { transferFunds } from '../../services/wallet'
import Loader from '../../components/Loader'
import DialogBox from 'react-native-dialogbox';
import AlertBox from '../../components/AlertBox'


const TransferMoney = ({navigation}) => {
    const userDetail = useSelector(state => state?.userDetail.userDetail)
    const [users , setUsers] = useState([])
    const [allUsers , setAllUsers] = useState([])
    const [newConvoModal , setNewConvoModal] = useState(true)
    const [transferModal , setTrasnferModal] = useState(false)
    const [reason , setReason] = useState()
    const [amout , setAmount] = useState()
    const [selectedUser , setSelectedUser] = useState()
    const [loading , setLoading ]= useState(false)
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
            setSelectedUser(item)
      }

      const handleSearch = (event)=> { 
        const search = users.filter(item => item.firstName.toLowerCase().includes(event.toLowerCase()) || item.lastName.toLowerCase().includes(event.toLowerCase()))
        setAllUsers(search)
      }
      
      const verifySelected = (item)=> {
            if (item == selectedUser) { 
                return true 
            }else {
                return false
            }
      }

      const handleDone = ()=> {

          setTrasnferModal(false)
          setLoading(true)

          if (amout && reason) {
            if (userDetail.wallet < parseInt(amout)){
                setLoading(false)
                setTitle("Error")
                setAlertBox(true)
                setMessage("you dont have enough funds to proceed this request")
      
            } else {

               let data = { 
                reciever : selectedUser._id,
                reason : reason,
                amount : amout,
               }
               transferFunds(data).then((res)=> {
                    setLoading(false)
                    setTitle("Success")
                    setAlertBox(true)
                    setMessage(req.body.message)
           
                }).catch(()=> {
                setLoading(false)
               })

            }
          }else {
            setLoading(false)
                setTitle("Error")
            setAlertBox(true)
            setMessage("Please provide amount and reason")
  
          }
       
      }

    return (

        <View style={screen}>

            <Header
            heading={"Transfer Money"}
            onBack={()=>navigation.pop()} />
            <View style={{backgroundColor : "red" , height : "80%"}}>

            <AlertBox 
            alertBox={alertBox}
             setAlertBox={setAlertBox} 
            title={title}
            message={message}
            />

             <TransferReason 
              handleDone = {handleDone}
              reason = {reason} setReason = {setReason}
              amount = {amout}  setAmount = {setAmount}
              setModalVisible={setTrasnferModal}
              modalVisible={ transferModal} 
              />
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
                <TouchableOpacity
                onPress = {()=> handleSelect(item)}
                style = {[styles.chatContainer , {backgroundColor : verifySelected(item) ?  colors.shade  : "white"}]}>
                    <View style = {{flexDirection : "row"}}>
                        <View style ={{width : "15%"}}>
                        <ImageBackground
                    source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                    style = {styles.userPic}>
                        </ImageBackground>

                        </View>
                        <View style = {{width : "75%", justifyContent : "space-evenly"}}>
                            <Text style = {{fontSize : RFValue(13) , fontWeight : "bold"}}>{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</Text>
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

           </View>

            <TouchableOpacity
            onPress={()=> {
                if (selectedUser) { 
                    setTrasnferModal(true)
                }else {
                  setTitle("Error")
                  setAlertBox(true)
                  setMessage("Please select the user")
                    return 
                }
            }}
            style={{flex : 1 ,  justifyContent : "center" , alignItems : "center"}}>
                <View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "center"}}>
                <View style={{width : 25 , height : 25 , justifyContent : "center"}}>
                    <Image 
                    source = {addIcon}
                    style={{width : "80%" , height : "80%" , resizeMode : "contain" , tintColor : colors.light}}
                    />
                </View>
            <Text style={{color : colors.light , fontWeight : 'bold'}}>Transfer</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default TransferMoney

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
})