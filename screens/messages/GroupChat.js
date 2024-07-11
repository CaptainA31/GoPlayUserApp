import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View , Button, FlatList, Image , ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import { colors, screen } from '../../GlobalStyles'
import { useDispatch , useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { BaseURL, webURL } from '../../services/BaseURL';
import axios from 'axios';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import EachMessage from './components/EachMessage';
import moment from 'moment';
import Header from '../../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import sendIcon from '../../assets/send.png'
import { jsxNamespacedName } from '@babel/types';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/back.png'
import wallpaper from '../../assets/wallpaper.png'
import { RFValue } from 'react-native-responsive-fontsize';
import ChatOption from './components/GroupOptionModal';
import { blockUser, deleteConversation, leaveGroup, unBlockUser } from '../../services/Conversation';
import { useFocusEffect } from '@react-navigation/core';
import GroupEachMessage from './components/GroupEachMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat  , Bubble} from 'react-native-gifted-chat';

const GroupChat = ({navigation , route}) => {
    const {convoId , receiver , friendName}  = route.params
    const userDetail = useSelector(state => state?.userDetail.userDetail)
    const [messages , setMessages] = useState([])
    const [newMessage , setNewMessage] = useState('')
    const [disable , setDisable] = useState(false)
    const [chatOptionModal , setChatOptionModal] = useState(false)
    const [giftedChatMessages , setGiftedChatMessages]= useState([])
    const socket = useRef();
    const chatRef = useRef(null);
    const dispatch = useDispatch()


    useEffect(()=>{
        let allList = JSON.parse(JSON.stringify(messages));
                let tempArr =[]
                allList.forEach(item => {
                    tempArr.push(
                        {
                            _id : item._id,
                            text: item.text,
                            createdAt: item.createdAt,
                            user: {
                              _id: item.sender,
                            },
                        }
                    )
                });
                setGiftedChatMessages(tempArr.reverse())
       },[messages])
       

     useFocusEffect(
        React.useCallback(() => {  
            socket.current = io(webURL)
            socket.current.on("getMessage" , (data) => {
                setMessages((prev => [...prev , {
                    updatedAt: data.updatedAt,
                    sender: data.sender,
                    senderName : data.senderName,
                    text: data.text,
                }]))
        
            } )
             let data = {
                 convesationId : convoId._id
             }
             axios.post(`${BaseURL}messages/get` , data)
             .then((res) => {
                 setMessages(res.data)
             })
       
          return () => socket.current.disconnect()
        }, [navigation])
      )

     useEffect(()=> {
        socket.current.emit("addUser" , userDetail._id)
        socket.current.on("getUsers" , (users)=> {
        })
    }, [userDetail._id])
    
    // useEffect(()=> {
    //     scrollView.current?.scrollIntoView({behavior : "smooth"})
    // }, [messages])

     const handleSend =async()=> {
         setDisable(true)
         setNewMessage('')
        if(newMessage == ""){
            return
        }
        var noSpacesString= newMessage.replace(/ /g,'');// "DoIhavespaces?"
        if (noSpacesString == "") {
            setNewMessage("")
            return
        }

        const token = await AsyncStorage.getItem("token")

         receiver.forEach (element  => {
            let data = {
                convesationId : convoId._id,
                sender : userDetail._id,
                reciever : receiver,
                senderName : `${userDetail.firstName} ${userDetail.lastName}`,
                text : newMessage.trimStart() 
            }

            console.log('reciever ' , element)
            socket.current.emit("sendMessage" , {

                senderId : userDetail._id,
                senderName :  `${userDetail.firstName} ${userDetail.lastName}`,
                recieverId : element._id,
                text : newMessage.trimStart()
            })

            setMessages([...messages , data])
    
           axios.post(`${BaseURL}messages` , data , {
            headers : {
                Authorization : `Bearer ${token}`
              }
           }).then((response) => {
               setDisable(false)
               dispatch(fetchConversation())
            //    setMessages([...messages , response.data])
           }).catch(()=> {
             setDisable(false)
    
           })
        });
    

  
    }

    const handleBlock = ()=> { 
        let data = {
            convoId : convoId._id,
            blockedUser : receiver
        }
       blockUser(data).then((res)=> { 
           navigation.pop()
       })
    }

  const handleLeaveGroup = ()=> {
        let data = { 
            convoId : convoId._id , 
        }
        leaveGroup(data).then((res)=>{ 
            navigation.pop()
        })
    }

    const handleDelete = ()=> { 
        // let data = {
        //     convoId : convoId._id,
        //     hideTo : userDetail._id
        // }
        // deleteConversation(data).then((res)=> {
        //     navigation.pop()
        // })
    }

    const handleCheckBlock = ()=> { 
        const blocked = convoId.blockedUser.find(item => item !== userDetail._id)
        if (blocked) {
            return true 
        }else { 
            return false
        }
    }

    const handleUnblock = ()=> { 
        let data = {
            convoId : convoId._id,
            blockedUser : receiver
        }

        unBlockUser(data).then((res)=> { 
            navigation.pop()
        })
    }
    const renderBubble = (props)=> {
        return (
            <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: colors.light,
              marginTop : RFValue(5),
              paddingHorizontal : RFValue(5)

          },
          left : {
              left : "-10%",
              marginTop : RFValue(5),
              paddingHorizontal : RFValue(10)

          }
        }}
      />
        )
      }


    return (
        <View style = {screen}>
            {/* <Header onBack = {()=> navigation.pop()} heading = {friendName} />
             */}
                 <LinearGradient 
        colors = {[colors.light , "#28133D"]}
        style = {styles.container}>
            <View style = {{flexDirection : "row" , justifyContent : "space-between", paddingHorizontal : "5%" , paddingRight : "10%"}}>
                <View style = {{flexDirection : "row" , justifyContent : "space-between"}}>
               <TouchableOpacity
              onPress ={()=> navigation.pop()}
              style = {styles.backButton}>
                   <Image source = {back} style = {styles.backlogo} />
              </TouchableOpacity>
              <Text style = {styles.text}>{friendName}</Text>
              </View>

              <TouchableOpacity 
              onPress = {()=> setChatOptionModal(!chatOptionModal)}
              style={{height : "100%" , paddingHorizontal : "2%"}}>
                  <View style={styles.dots} />
                  <View style={styles.dots}/>
                  <View style={styles.dots}/>
              </TouchableOpacity>
         
            </View>
        </LinearGradient>


            <ImageBackground
            source={wallpaper}
            imageStyle = {{width : "100%" , height :"100%" , resizeMode  : "cover"}}
            style = {{marginTop : "5%" , height : "75%", paddingBottom : "4%" , paddingHorizontal : "2%"}}>
        
           <ChatOption 
           handleCheckBlock = {handleCheckBlock}
           modalVisible = {chatOptionModal}
           setModalVisible = {setChatOptionModal} 
           handleLeaveGroup = {handleLeaveGroup}
           handleUnblock = {handleUnblock}
           handleDelete = {handleDelete}
           />
            {/* <FlatList 
            data = {messages}
            ref  = {chatRef}
            keyExtractor = {item => item._id}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{marginBottom : "5%"}}
            onLayout = {()=> chatRef.current.scrollToEnd()}
            onContentSizeChange =  {()=> chatRef.current.scrollToEnd()}
            renderItem = {({item})=> {
                return (
                    <>
                     {
                       item.sender === userDetail._id ? 
                       <GroupEachMessage name = {item.senderName} text = {item.text} myMsg = {true} time = {moment(item.updatedAt).format('h:mm')} />
                       : 
                       <GroupEachMessage name = {item.senderName} text = {item.text} time = {moment(item.updatedAt).format('hh:mm a')} />
                    }
                    </>
                )
            }}
            /> */}
                       <GiftedChat
             messages={giftedChatMessages}
             renderInputToolbar = {()=> <View></View>}
             alignTop = {true}
             renderBubble ={renderBubble}
             
             showUserAvatar={false} user ={{_id : userDetail._id  }} />
        </ImageBackground>
        <View style = {{flexDirection : "row" , position : "absolute", bottom : 0 ,alignItems : "center" , width : "100%", height : 80 }}>
            <View style={{width : "80%", height : "100%" , justifyContent : "center", paddingLeft : "2%"  }}>
                <View style= {styles.inputContainer}>
                <TextInput 
                 placeholder = {"Type a message..."}
                 style = {{color : "#181818"}}
                 value = {newMessage}
                 onChangeText = {(event) => setNewMessage(event)}
                />
                </View>
            </View>

            <View style={{width : "20%", height : "100%" , justifyContent : "center" , alignItems : "center"}}>
                <TouchableOpacity
                onPress = {handleSend}
                disabled = {disable}
                activeOpacity = {0.2}
                style = {styles.sendButton}>
                    <Image
                    source = {sendIcon}
                    style = {{width : "40%" , height : "40%" , resizeMode  :"contain" , tintColor : "white" }}
                    />
                </TouchableOpacity>
            </View>
        </View>

        {/* <OutlinedTextField
        tintColor = {colors.light}
        baseColor ={colors.light}
        textColor = {colors.light}
        autoCapitalize = "none"
        onChangeText = {(event) => setNewMessage(event)}
         label = "field"
        />
        <Button title  = {"Send"}  onPress = {handleSend} /> */}
        </View>
    )
}

export default GroupChat

const styles = StyleSheet.create({
    inputContainer  : {
        borderColor : "grey",
        borderWidth : 1,
        height : "70%",
        borderRadius : 30,
        justifyContent: 'center',
        paddingLeft : "3%"
    },
    sendButton : {
        backgroundColor : colors.light,
        width  : 55,
        height : 55,
        borderRadius : 50,
        justifyContent : "center",
        alignItems : "center"

    },
    container : {
        height : 80,
        backgroundColor : "white",
        paddingLeft : "3%",
        borderBottomLeftRadius : RFValue(25),
        borderBottomRightRadius : RFValue(25),
        justifyContent : "center",
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    backButton :{ 
       paddingTop :"2%",
        alignItems : "center",
        flexDirection : "row",
        paddingRight : "10%"
   },
   backlogo : {
    resizeMode : "center",
    width : RFValue(15), height : RFValue(15),
},
    text : {
        fontSize : RFValue(16),
        color : "white",
        top : "0.5%"
    },
    dots : {
        backgroundColor : "white",
        width : 5 , height : 5,
        borderRadius : 50,
        top : 5, marginTop  : 2
    }
})
