import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View , Modal, Dimensions, TextInput, Image, TouchableOpacity} from 'react-native'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { capitalizeFirstLetter, colors, imageStyle } from '../../../GlobalStyles';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import { FlatList } from 'react-native-gesture-handler';
import { getAllUser } from '../../../services/signin';
import { webURL } from '../../../services/BaseURL';
import profile from '../../../assets/profile.png';
import groups from '../../../assets/group.png';
import searchIcon from '../../../assets/search.png'
import { useFocusEffect } from '@react-navigation/native';
import { getAllGroups, getMyGroups } from '../../../services/Conversation';

let globalSelectedUser = []
let globalSelectedGroups = {}

const FirstRoute = () => {
  const [users , setUsers] = useState([])
  const [selectedUser , setSelectedUser] = useState([])
  const [allUsers , setAllUsers] = useState([])

    useEffect(()=> {
      getAllUser().then((res)=> {
            setUsers(res.data.users)
            setAllUsers(res.data.users)
      })
    }, [])

    const handleSearch = (event)=> { 
      const search = users.filter(item => item.firstName.toLowerCase().includes(event.toLowerCase()) || item.lastName.toLowerCase().includes(event.toLowerCase()))
      setAllUsers(search)
  }

    useEffect(()=> {
        globalSelectedUser = selectedUser
    }, [selectedUser])

    const  handleSelection = (item)=> {
        let array =  selectedUser.find(current => current == item )
        if (array){
          let data = selectedUser.filter(current => current !== item )
          return setSelectedUser(data)
        }
        setSelectedUser([...selectedUser  , item])
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
  
  return  (
    
    <View style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
        <View style = {styles.searchBar}>
            <TextInput
            placeholder = {"Search for community"}
            onChangeText={(event)=> handleSearch(event)}
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
    showsVerticalScrollIndicator = {false}
    renderItem = {({item }) => {
        return (
            <TouchableOpacity
            onPress = {()=> handleSelection(item)}
            style = {checkMultiple(item) ? [styles.userContainer , {backgroundColor : colors.shade}] : styles.userContainer }>
            <View style={{ width : "20%" , justifyContent : "center" , alignItems : "center" }}>
                <View style = {styles.circle}>
                    <Image 
                    source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                    style = {imageStyle}
                    />
                </View>
            </View>
            <View style={{ width : "70%" , justifyContent : "center", paddingLeft : "3%"}}>
                <Text style={{fontSize : RFValue(15)}}>{capitalizeFirstLetter(item.firstName)} {capitalizeFirstLetter(item.lastName)}</Text>
                <Text style={{marginTop : "2%"}}>{capitalizeFirstLetter(item.gender)} | {item.age} years</Text>
    
            </View>
          </TouchableOpacity>
        )
    }}
     
     />
    </View>
  )
};
   
  const SecondRoute = () => {
    const [convo , setConvo] = useState([])
    const [selectedGroup , setSelectedGroup] = useState([])

      useEffect(()=> {
        getMyGroups().then((res)=> {
          setConvo(res.data.conversation)
      })
      }, [])

      
    useEffect(()=> {
      globalSelectedGroups = selectedGroup
  }, [selectedGroup])
  
      const  handleSelection = (item)=> {
        if (selectedGroup == item) { 
         return setSelectedGroup()
        }
          setSelectedGroup(item)
        }
  
        const checkMultiple = (item)=> {
          if (item == selectedGroup) {
            return true
          }else{ 
            return false
          }
      }
    
    return  (
      
      <View style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "5%" , paddingVertical : "3%"}]} >
  
  
       <FlatList 
      data = {convo}
      showsVerticalScrollIndicator = {false}
      keyExtractor={ item => item._id}
      renderItem = {({item }) => {
          return (
              <TouchableOpacity 
              onPress={()=>handleSelection(item)}
              style = {checkMultiple(item) ? [styles.groupContainer , {backgroundColor : colors.shade}] : styles.groupContainer }>
              <View style={{height : "100%", flexDirection  :"row"}}>
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
                  <Text style={{fontSize : RFValue(10)}}>Group Owner : {item.groupOwner?.firstName} {item.groupOwner?.lastName}</Text>
           
                 </View>
                 <View style={{width : "20%" , height: "100%" , alignItems: 'center',}}>
                   <View style ={styles.members}>
                      <Text style={{color : colors.light,fontWeight : "bold" , fontSize : RFValue(9)}}>{item.members.length}</Text>
                      <Text style={{color : colors.light, fontSize : RFValue(8)}}>member(s)</Text>
                       </View>
  
  
                 </View>
              </View>
      
             </TouchableOpacity>
          )
      }}
       
       />
      </View>
    )
  }
  const initialLayout = { width: Dimensions.get('window').width };

const Invites = ({modalVisible , setModalVisible  , setLocation  , Invites , setSelectedUser , setSelectedGroup}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Community' },
      { key: 'second', title: 'Groups' },
    ]);


    const renderScene = SceneMap({
        first:  FirstRoute,
        second: SecondRoute,
      });

      const handleInvite = ()=> { 
        setModalVisible(false)
        setSelectedGroup(globalSelectedGroups)
        setSelectedUser(globalSelectedUser)
      }

    return (
        <Modal
        visible={modalVisible}
        useNativeDriverForBackdrop
        hasBackdrop ={false}
        animationInTiming = {300}
        animationOutTiming ={300}
        onRequestClose = {()=> setModalVisible(false)}
        style = {{height : "100%" }}>
                <View style= {{backgroundColor : "white", height : "100%"}}>
                    <Header
                    onBack={()=> setModalVisible(false)}
                    heading = {"Select Community & Groups"} />

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
                      <View style={{flex : 0.1 ,justifyContent : "center"  , paddingHorizontal : "10%"}}>
                          <TouchableOpacity 
                          onPress = {()=>handleInvite()}
                          style={{height : RFValue(45)}}>
                          <Button text = {"Invite"} />
                          </TouchableOpacity>
                          </View>
                </View>
            </Modal>
    
    )
}

export default Invites

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
      height : 70,
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
