import React, { useState } from 'react'
import { Alert, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import { capitalizeFirstLetter, colors } from '../../GlobalStyles'
import { webURL } from '../../services/BaseURL'
import profile from '../../assets/profile.png';
import { RFValue } from 'react-native-responsive-fontsize'
import Button from '../../components/Button'
import { createConversation } from '../../services/Conversation'
import { useSelector } from 'react-redux'
import wallpaper from '../../assets/wallpaper.png'

const PlayerProfile = ({navigation , route}) => {
    const {player} = route.params
    const [checkBox , setCheckBox] = useState(false)
    const userDetail = useSelector(state => state?.userDetail.userDetail)
    console.log("player is" ,player)
    const handleSelect = (item)=> { 
        console.log("hit")
        let data = {
            receiverID : item._id
        }
        createConversation(data).then ((response)=> {
         if (response.data.status) {
             navigation.navigate("chat" , {convoId : response.data.conversation , receiver : item._id , friendName : `${item.firstName} ${item.lastName}`})
        
         }else {
            const blocked = response.data.conversation.blockedUser.find(item => item == userDetail._id)
            if(blocked) {
                return Alert.alert("You have been blocked by this user")
            }
            //  navigation.navigate("chat" , {convoId : response.data.conversation , receiver : item._id , friendName : `${item.firstName} ${item.lastName}`})
            //  setNewConvoModal(false)
         }
        }).catch((ex)=> {
            console.log(ex)
        })
    }

    return (
        <ImageBackground
        source={wallpaper}
        imageStyle = {{width : "100%" , height : "100%" , resizeMode : "cover"}}
        style={{height : "100%" , backgroundColor : "white"}}>
            <Header heading={'Player Profile'} 
            onBack={()=> navigation.pop()}
            />
           <View style={styles.profileContainer}>
                <View style={styles.profileBox}>
                <Image 
                 source = {player.profilePic == "" ? profile : {uri : `${webURL}${player.profilePic}`}}
                 style={{width : "100%" , height : "100%" , resizeMode : "contain"}}
               />
                </View>
                <Text style = {{fontSize : RFValue(13) ,color : colors.light ,fontWeight : "bold" , marginTop : "1%"}}>{capitalizeFirstLetter(player.firstName)} {capitalizeFirstLetter(player.lastName)}</Text>
                <Text>{capitalizeFirstLetter(player.gender)} | {player.age}</Text>
           </View>
           <TouchableOpacity
           onPress={()=> handleSelect(player)}
           style = {{height : RFValue(40) , width : "40%" , alignSelf : "center"}}>
                <Button text='Send Message' />
           </TouchableOpacity>
         {
             player.sportsInterest.length > 0 ? 
             <View style = {styles.interestBox}>
             <Text style={{alignSelf : "center"}}>Interests</Text>
             <FlatList
             numColumns={3}
             data = {player.sportsInterest}
             contentContainerStyle = {{marginTop : 10}}
             renderItem={({item , index}) => { 
                 console.log(item)
                 return (
                     <View style={{width : "33.3 %" , paddingHorizontal : "2%"}}>
                     <View style={{
                      height : 30 , 
                     backgroundColor : colors.light , borderRadius : 5,
                     marginBottom : 10, alignItems : 'center' , justifyContent  :'center'
                     
                     }}> 
                     <Text style={{fontSize : RFValue(11) , color  : 'white' }}>{item.name}</Text>
                     
                     </View>
                     </View>
                 )
             }}
             />
        </View> :
             <View style = {styles.interestBox}>
                 <Text style={{alignSelf : "center"}}>no interest added</Text>
           </View>
         }
        </ImageBackground>
    )
}

export default PlayerProfile

const styles = StyleSheet.create({
    profileContainer : {
        height : "30%" , 
        justifyContent  :"center" , alignItems : "center"
    },
    profileBox : { 
        width : RFValue(135), height : RFValue(135), 
        borderWidth : 1 , borderColor : colors.light,
        borderRadius : 100 , overflow: 'hidden',
    },
    interestBox : {
        width : "90%",
        alignSelf : "center", marginTop : "5%" , 
        padding : "2%",
        shadowColor: "#000",
        shadowOffset: {
    	width: 0,
	    height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 2,
    },

})
