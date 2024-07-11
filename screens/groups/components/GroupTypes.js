import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View , Modal, Dimensions, TextInput, Image, TouchableOpacity, ImageBackground, Alert} from 'react-native'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { capitalizeFirstLetter, colors, imageStyle } from '../../../GlobalStyles';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import { FlatList } from 'react-native-gesture-handler';
import { getAllUser } from '../../../services/signin';
import { webURL } from '../../../services/BaseURL';
import groups from '../../../assets/group.png';
import trash from '../../../assets/trash.png';
import { deleteGroups, getAllGroups, getMyGroups, getOtherGroups, joinGroup } from '../../../services/Conversation';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
// import {useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import AlertBox2 from '../../../components/AlertBox2';

let globalSelectedUser = []

const FirstRoute = (navigation) => {
  const [convo , setConvo] = useState([])
  const [selectedUser , setSelectedUser] = useState([])
  const [loading  , setLoading ] = useState(false)
  // const userDetail = useSelector(state => state?.userDetail.userDetail)

  const [message , setMessage] = useState('')
  const [alertBox2 , setAlertBox2] = useState(false)
  const [title , setTitle] = useState("")
  const [back, setBack]= useState()
    
    useFocusEffect(
        React.useCallback(() => {  
            getMyGroups().then((res)=> {
                setConvo(res.data.conversation)
            })
    
       
          return () => null
        }, [navigation])
      )

    useEffect(()=> {
        globalSelectedUser = selectedUser
    }, [selectedUser])

    const  handleSelection = (item)=> {
        // let array =  selectedUser.find(current => current == item )
        // if (array){
        //   let data = selectedUser.filter(current => current !== item )
        //   return setSelectedUser(data)
        // }
        // setSelectedUser([...selectedUser  , item])
      }

      const checkMultiple = (item)=> {
        if(selectedUser.length == 0) {
            return false
        }else{
          let data = selectedUser.find(element => element == item)
          if (data){
              return true
          }else {
              return false
          }
      }
    }
    const handleDeleteGroup = (item)=> { 
            setTitle("Delete Group?")
            setAlertBox2(true)
            setMessage( `Are you sure you want to delete this group?`)
            setBack(item)
    }

    
    const handleAbort = ()=> {
      let data = {
        convoId : back
    }   
      setLoading(true)
      deleteGroups(data).then((res)=> { 
          setLoading(false)
          getMyGroups().then((res)=> {
              setConvo(res.data.conversation)
              setAlertBox2(false)

          })
         }).catch((res)=> { 
             setLoading(false)
             setAlertBox2(false)
         })
    }
  
  return  (
    
    <View style={[styles.scene, {  paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
        <Loader value={loading} />
       
        <AlertBox2 
            alertBox={alertBox2}
            setAlertBox={setAlertBox2} 
            title={title}
            message={message}
            onAbort={handleAbort}
            cancel = {"No"} success={"Yes"}
            />

     <FlatList 
    data = {convo}
    showsVerticalScrollIndicator = {false}
    keyExtractor={ item => item._id}
    renderItem = {({item }) => {
        if (item) { 
            const friendData = item?.members?.filter(item => item._id !== userDetail._id)
            item.members = friendData
        }
       
        return (
            <View style={styles.groupContainer}>
                <View style={{height : "65%", flexDirection  :"row"}}>
            <View style={{width : "15%" , height: "100%"}}>
               <View style={{height : "100%" , justifyContent: 'center', alignItems : "center"}}>
                  <Image 
                  source={groups}
                  style={{height : "60%" , width : "60%" , tintColor : colors.light}}
                  />
                   </View>
            </View>

            <View style={{width : "65%", height: "100%", justifyContent : "center" }}>
              
                <Text style={{fontWeight : "bold"}}>{item.groupName}</Text>
              {
                item.isPublicGroup ? 
                <Text style={{fontSize : RFValue(10)}}>Group Owner : Admin</Text>
:
<Text style={{fontSize : RFValue(10)}}>Group Owner : {item.groupOwner.firstName} {item.groupOwner.lastName}</Text>

              }
               </View>
               <View style={{width : "20%" , height: "100%" , alignItems: 'center'}}>
                 <View style ={styles.members}>
                    <Text style={{color : colors.light,fontWeight : "bold" , fontSize : RFValue(9)}}>{item.members.length}</Text>
                    <Text style={{color : colors.light, fontSize : RFValue(8)}}>member(s)</Text>
                     </View>

                    {
                        userDetail._id == item.groupOwner._id && 
                        <TouchableOpacity 
                        onPress={()=> handleDeleteGroup(item._id)}
                        style = {styles.redIcon}>
                        <Image
                         source = {trash}
                            style = {{tintColor : "white" , width : "80%" , height : "80%" , resizeMode : "contain"}}/>
                          
                            </TouchableOpacity>
                    }

               </View>
            </View>
            <View style={{backgroundColor : colors.light , height : "35%" , flexDirection : "row"}}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("groupChat" , {convoId : item , receiver : item.members , friendName : `${item.groupName}`})}
                style={{width : "50%" , height : "100%" , justifyContent : "center" , alignItems : "center" , borderEndColor : "white" , borderEndWidth :1}}>
                    <Text style={{color : "white" }}>Chat</Text>
                    </TouchableOpacity>
                  {
                      item.groupOwner._id !== userDetail._id ?
                      <TouchableOpacity
                      onPress={()=> navigation.navigate("viewMembers" , {allMembers : item.members})}
                      style={{width : "50%" , height : "100%" , justifyContent : "center" , alignItems : "center" ,}}>
                      <Text style={{color : "white"}}>
                          View Members
                      </Text>
                  </TouchableOpacity> : 
                    <TouchableOpacity                    
                    onPress={()=> navigation.navigate("viewAndEditMembers" , {allMembers : item.members , convoId : item._id})}
                    style={{width : "50%" , height : "100%" , justifyContent : "center" , alignItems : "center" ,}}>
                    <Text style={{color : "white"}}>
                        View or Edit Members
                    </Text>
                </TouchableOpacity>
                  }
                </View>
           </View>
        )
    }}
     
     />
    </View>
  )
};
   
  const SecondRoute = (navigation) => {
    const [convo , setConvo] = useState([])
    const [selectedUser , setSelectedUser] = useState([])
    const [loading, setLoading] = useState(false)
  
      
      useFocusEffect(
          React.useCallback(() => {  
              getOtherGroups().then((res)=> {
                  setConvo(res.data.conversation)
              })
      
         
            return () => null
          }, [navigation])
        )
  
      useEffect(()=> {
          globalSelectedUser = selectedUser
      }, [selectedUser])
  
      const  handleSelection = (item)=> {
          // let array =  selectedUser.find(current => current == item )
          // if (array){
          //   let data = selectedUser.filter(current => current !== item )
          //   return setSelectedUser(data)
          // }
          // setSelectedUser([...selectedUser  , item])
        }
  
        const checkMultiple = (item)=> {
          if(selectedUser.length == 0) {
              return false
          }else{
            let data = selectedUser.find(element => element == item)
            if (data){
                return true
            }else {
                return false
            }
        }
      }

      const handleJoinGroup = (item) => { 
          let data = {
              convoId :  item._id
          }
          setLoading(true)
          joinGroup(data).then(()=>{

            getOtherGroups().then((res)=> {
                setLoading(false)
                setConvo(res.data.conversation)
            })
          })
      }
    
    return  (
      
      <View style={[styles.scene, { paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
          <Loader value={loading} />
  
       <FlatList 
      data = {convo}
      showsVerticalScrollIndicator = {false}
      keyExtractor={ item => item._id}
      renderItem = {({item }) => {
          return (
              <View style={styles.groupContainer}>
                  <View style={{height : "65%", flexDirection  :"row"}}>
              <View style={{width : "15%" , height: "100%"}}>
                 <View style={{height : "100%" , justifyContent: 'center', alignItems : "center"}}>
                    <Image 
                    source={groups}
                    style={{height : "60%" , width : "60%" , tintColor : colors.light}}
                    />
                     </View>
              </View>
  
              <View style={{width : "65%", height: "100%", justifyContent : "center" }}>
                
                  <Text style={{fontWeight : "bold"}}>{item.groupName}</Text>
                  <Text style={{fontSize : RFValue(10)}}>Group Owner : GoPlay Admin</Text>
           
                 </View>
                 <View style={{width : "20%" , height: "100%" , alignItems: 'center',}}>
                   <View style ={styles.members}>
                      <Text style={{color : colors.light,fontWeight : "bold" , fontSize : RFValue(9)}}>{item.members.length}</Text>
                      <Text style={{color : colors.light, fontSize : RFValue(8)}}>member(s)</Text>
                       </View>
  
  
                 </View>
              </View>
              <View style={{backgroundColor : colors.light , height : "35%" , flexDirection : "row"}}>
                  <TouchableOpacity
                  onPress={()=>handleJoinGroup(item)}
                  style={{width : "50%" , height : "100%" , justifyContent : "center" , alignItems : "center" , borderEndColor : "white" , borderEndWidth :1}}>
                      <Text style={{color : "white" }}>Join</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                  onPress={()=> navigation.navigate("viewMembers" , {allMembers : item.members})}                  
                      style={{width : "50%" , height : "100%" , justifyContent : "center" , alignItems : "center" ,}}>
                          <Text style={{color : "white"}}>
                              View Members
                          </Text>
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

const GroupTypes = ({modalVisible , setModalVisible  , setLocation , navigation, setSelectedUser}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'My Groups' },
      { key: 'second', title: 'All Groups' },
    ]);


    const renderScene = SceneMap({
        first:  ()=> FirstRoute(navigation),
        second: ()=> SecondRoute(navigation)
      });

      const handleInvite = ()=> { 
        setModalVisible(false)
        setSelectedUser(globalSelectedUser)
      }

    return (

                <View style= {{ height : "100%"}}>
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

export default GroupTypes

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
    groupContainer : {
        borderColor : "lightgrey",
        borderWidth : 1 ,
        height : 110,
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
})
