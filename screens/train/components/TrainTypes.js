import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View , Modal, Dimensions,  ImageBackground, Pressable, Image} from 'react-native'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { capitalizeFirstLetter, colors, imageStyle } from '../../../GlobalStyles';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import { getAllUser } from '../../../services/signin';
import { webURL } from '../../../services/BaseURL';
import groups from '../../../assets/group.png';
import wallpaper from '../../../assets/wallpaper.png';
import { deleteGroups, getAllGroups, getMyGroups, getOtherGroups, joinGroup } from '../../../services/Conversation';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Games from '../../../components/Games';
import BookingGames from '../../../components/BooingGames';
import { getAllMyGames } from '../../../services/myGameService';
import noFacility from '../../../assets/noTrain.png'
import { getAllTrain, getIndividualTrain } from '../../../services/Train';
import locationIcon from '../../../assets/location_pin.png';

let globalSelectedUser = []

const FirstRoute = (navigation) => {
  // const myGameList = useSelector(state => state?.myGameList.myGamesList)  
  const [myFacilities , setMyFacility] = useState([])

  const onBack = ()=> {
      navigation.navigate("HOME")
  }

  useEffect(()=>{ 
    getAllTrain().then((res)=> {
      setMyFacility(res.data.train)
  })
  }, [])

  return  (
    
    <ImageBackground
    source={wallpaper}
    style={[styles.scene, { paddingHorizontal : "3%" , paddingVertical : "3%"}]} >
                {
           myFacilities.length >=1 ?
           <FlatList
           data = {myFacilities}
           contentContainerStyle={{ paddingBottom: 80 }}
           showsVerticalScrollIndicator = {false}
           leftOpenValue={0}
           rightOpenValue={0}
           renderItem = {({item , index}) => {
               return (
                   <Pressable 
                   onPress = {()=> navigation.navigate("ViewTrain" , {facility : item})}
                   style = {styles.facilites}>
                   <View 
                   style = {styles.facImage}
                   >
                    <ImageBackground 
                    source = {{uri : `${webURL}${item.coverPhoto}`}}
                    style = {{width : "100%" , height : "100%" , justifyContent : "flex-end" ,
                 }}
                    >
                        <View style = {{height : "100%" , justifyContent : "flex-end" }}>
                            <View
                                  style = {{height : "100%" , justifyContent : "flex-end" }}
                            >
                               </View>
                               </View>     
                          </ImageBackground>
                        </View>
                        <View style = {{ paddingHorizontal : "2%" , flexDirection : "row" }}>
                            <View style ={{marginTop : "1%" , height : "100%", width : "95%"}}>
                                <Text style={styles.facTitle}>{item.name}</Text>
                               
                               <Text numberOfLines={2}> {item.description}</Text>
                                <View style={{flexDirection : "row" , alignItems : "center", marginTop : "2%"}}>
                                <View style={{width : RFValue(14) , height : RFValue(14) , marginRight : "1%" } }>
                            <Image 
                            source = {locationIcon}
                            style = {{width : "90%" , height : "90%" , resizeMode : "contain"}}
                            />
                        </View>
                        <Text numberOfLines={1} >{item.location.name}</Text>
                        </View>

                             </View>

                             <View>
                                 </View>
                         </View>
                         
                 </Pressable> 
                 
               )
           }}
           />

           :
           <ImageBackground 
           imageStyle = {{width : "100%", height : "100%"}}
           source = {wallpaper}
           style = {{height : "82%" , backgroundColor : "white" ,
           paddingHorizontal : "4%" , marginRight : "1%"
           }}> 
           <Pressable 
onPress = {()=> navigation.navigate("AddFacility")}
style = {[styles.noBooking , {height : RFValue(130) , marginBottom : "10%"}]}>
                     <Image 
                   style = {{resizeMode : "contain" , width : "90%" , height : "90%"}}
                   source = {noFacility}
                   />
</Pressable> 
           </ImageBackground>
       }

    </ImageBackground>
  )
};
   
  const SecondRoute = (navigation) => {
  
    // const myGameList = useSelector(state => state?.myGameList.myGamesList)  
    const [myFacilities , setMyFacility] = useState([])

    const onBack = ()=> {
        navigation.navigate("HOME")
    }
  
    useEffect(()=>{ 
      getIndividualTrain().then((res)=> {
        setMyFacility(res.data.train)
    })
    }, [])
  
    return  (
      <ImageBackground
    source={wallpaper}
    style={[styles.scene, { paddingHorizontal : "3%" , paddingVertical : "3%"}]} >
                {
           myFacilities.length >=1 ?
           <FlatList
           data = {myFacilities}
           contentContainerStyle={{ paddingBottom: 80 }}
           showsVerticalScrollIndicator = {false}
           leftOpenValue={0}
           rightOpenValue={0}
           renderItem = {({item , index}) => {
               return (
                   <Pressable 
                   onPress = {()=> navigation.navigate("ViewTrain" , {facility : item})}
                   style = {styles.facilites}>
                   <View 
                   style = {styles.facImage}
                   >
                    <ImageBackground 
                    source = {{uri : `${webURL}${item.coverPhoto}`}}
                    style = {{width : "100%" , height : "100%" , justifyContent : "flex-end" ,
                 }}
                    >
                        <View style = {{height : "100%" , justifyContent : "flex-end" }}>
                            <View
                                  style = {{height : "100%" , justifyContent : "flex-end" }}
                            >
                               </View>
                               </View>     
                          </ImageBackground>
                        </View>
                        <View style = {{ paddingHorizontal : "2%" , flexDirection : "row" }}>
                            <View style ={{marginTop : "1%" , height : "100%", width : "95%"}}>
                                <Text style={styles.facTitle}>{item.name}</Text>
                               
                               <Text numberOfLines={2}> {item.description}</Text>
                                <View style={{flexDirection : "row" , alignItems : "center", marginTop : "2%"}}>
                                <View style={{width : RFValue(14) , height : RFValue(14) , marginRight : "1%" } }>
                            <Image 
                            source = {locationIcon}
                            style = {{width : "90%" , height : "90%" , resizeMode : "contain"}}
                            />
                        </View>
                        <Text numberOfLines={1} >{item.location.name}</Text>
                        </View>

                             </View>

                             <View>
                                 </View>
                         </View>
                         
                 </Pressable> 
                 
               )
           }}
           />

           :
           <ImageBackground 
           imageStyle = {{width : "100%", height : "100%"}}
           source = {wallpaper}
           style = {{height : "82%" , backgroundColor : "white" ,
           paddingHorizontal : "4%" , marginRight : "1%"
           }}> 
           <Pressable 
onPress = {()=> navigation.navigate("AddFacility")}
style = {[styles.noBooking , {height : RFValue(130) , marginBottom : "10%"}]}>
                     <Image 
                   style = {{resizeMode : "contain" , width : "90%" , height : "90%"}}
                   source = {noFacility}
                   />
</Pressable> 
           </ImageBackground>
       }

    </ImageBackground>
      
    )
  }
   
  const initialLayout = { width: Dimensions.get('window').width };

const TrainTypes = ({modalVisible , setModalVisible  , setLocation , navigation, setSelectedUser}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Academies' },
      { key: 'second', title: 'Individual' },
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

export default TrainTypes

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width : "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      scene: {
        flex: 1,
        paddingHorizontal : "3%"
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

    facilites : {
      width :  "100%",
      marginTop : RFValue(15),
      backgroundColor : "white",
      overflow : "hidden",
      paddingBottom : RFValue(10),
      // height : RFValue(260),
      borderRadius : RFValue(10),
      shadowColor: "#000",
      shadowOffset: {
    width: 0,
    height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 4,
  },
  facImage : {
      height : RFValue(150),
      width : "100%",
  },
  hiddenItem : {
      width : "100%",
      height : RFValue(190),
      alignItems : "flex-end",
      justifyContent : "space-around",
      paddingRight : "10%",
      paddingVertical : "10%"

  },
  logo : {
      width : RFValue(20),
      height : RFValue(20),
      resizeMode : "contain"
  },
  facTitle : {
      fontSize : RFValue(18),
      color : colors.light,
      fontWeight : "bold"
  },
  noBooking: {
      height : RFValue(100),
      width : "100%",
      marginTop : "10%",
      alignSelf : "center",
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "white",
      overflow : "hidden",
      borderRadius : RFValue(10),
      shadowColor: "#000",
      shadowOffset: {
    width: 0,
    height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 4,
  },
  circle : { 
      width : RFValue(25), height : RFValue(25),
      borderColor : colors.light ,
      borderWidth : 1,
      borderRadius : 50, marginRight : RFValue(10),
      justifyContent : "center",
      alignItems : "center"
  },
  button : { 
      height : "25%" , width : "80%" ,
      borderRadius : RFValue(5),
      alignItems : "center", justifyContent : "center",
      marginTop : "3%"
  }
})
