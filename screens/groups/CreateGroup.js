import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View , Modal, Alert, TextInput, Image, TouchableOpacity, FlatList} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { capitalizeFirstLetter, colors, imageStyle, screen, stringReduce } from '../../GlobalStyles'
import { webURL } from '../../services/BaseURL'
import { getAllUser } from '../../services/signin'
import profile from '../../assets/profile.png'
import Header from '../../components/Header'
import searchIcon from '../../assets/search.png'
import closeIcon from '../../assets/close.png'
import Button from '../../components/Button'
import GroupName from './components/GroupName'
import AnimatedFlatlist from 'react-native-animated-flatlist'
import {createGroupConversation} from '../../services/Conversation'
// import {useSelector } from 'react-redux';
import Loader from '../../components/Loader'
import AlertBox from '../../components/AlertBox'

const CreateGroup = ({navigation}) => {
  
    const [users , setUsers] = useState([])
    const [selectedUser , setSelectedUser] = useState([])
    const [groupNameModal , setGroupNameModal ] = useState(false)
    const [name , setName ] = useState()
    const [loading , setLoading] = useState(false)
    // const userDetail = useSelector(state => state?.userDetail.userDetail)
    const [allUsers , setAllUsers] = useState([])
    const [message , setMessage] = useState('')
    const [alertBox , setAlertBox] = useState(false)
    const [title , setTitle] = useState("")

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

      const handleDone = ()=> { 
         if (selectedUser.length == 0) { 
          setTitle("Error")
          setAlertBox(true)
          setMessage("Select players to create group")
             return 
         }
         if (!name) { 
          setTitle("Error")
          setAlertBox(true)
          setMessage("Add a group name first")
            return
         }
         let data = {
            members: selectedUser.map(item => item._id),
            groupName : name
          }
          setLoading(true)
          data.members.push(userDetail._id)

          createGroupConversation(data).then((res)=> {
              setLoading(false)
              setGroupNameModal(false)
              navigation.pop()
          }).catch(()=> {
              setLoading(false)
          })
      }
  

  
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
      <View style={screen}>
        
            <AlertBox 
            alertBox={alertBox}
            setAlertBox={setAlertBox} 
            title={title}
            message={message}
            />

          <Header heading={'Create Group'} onBack={()=> navigation.pop()} />
 <View style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "5%" , paddingVertical : "3%" }]} >       
      <GroupName 
      handleDone = {handleDone}
      name = {name} setName = {setName}
      setModalVisible={setGroupNameModal} modalVisible={ groupNameModal} />
    <Loader value={ loading } />
    <View>

            {
                selectedUser.length > 0 ? 
                <FlatList
                data= {selectedUser}
                horizontal = {true}
                renderItem={({item, index})=> {
                    return(
                      <View style={{}}>
                      <TouchableOpacity 
                      onPress={()=> handleSelection(item)}
                      style={{width : 20 , height :20  , justifyContent : "center" , alignItems : "center", backgroundColor : "white", borderRadius : 50, position : "absolute", zIndex : 100}}>
                          <Image 
                          source={closeIcon}
                          style={{width : "50%", height : "50%" , resizeMode : "contain", tintColor : "grey"}}
                          />
                          </TouchableOpacity>
                  <View style = {[styles.circle , {marginRight : 10}]}>
                   <Image 
                   source = {item.profilePic == "" ? profile : {uri : `${webURL}${item.profilePic}`}}
                   style = {{width : "100%" , height :"100%" , resizeMode  :'contain'}}
                   />
               </View>
               <View style = {{width : 60, alignItems : "center"}}>
               <Text style={{fontSize : RFValue(10) , textAlign :"center"}}>{stringReduce(`${item.firstName} ${item.lastName}` , 12)}</Text>
               </View>
              </View>
       
                    )
                
                }}
                /> : null
            }
    </View>



  <View style = {[styles.searchBar , {marginTop :15}]}>
      <TextInput
      placeholder = {"Search for community"}
      onChangeText={(event)=>handleSearch(event)}
      style={{width : "90%" , color : "#181818"}}
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
<View style={{ paddingHorizontal : "10%", justifyContent: 'center',alignItems : "center"  ,flex : 0.1}}>
    <TouchableOpacity 
    onPress={()=>{
      if (selectedUser.length > 0){
        setGroupNameModal(true)
      }else {
        setTitle("Error")
        setAlertBox(true)
        setMessage("Select players to create group")
      }
    }}
    style={{height : RFValue(45) , width : "100%"}}>
    <Button text={ "Create Group"} />
    </TouchableOpacity>
</View>
      </View>
     
    )
}

export default CreateGroup

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width : "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      scene: {
        flex: 0.9,
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
})
