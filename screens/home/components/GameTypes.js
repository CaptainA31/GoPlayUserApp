import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View , Modal, Dimensions,  ImageBackground, Alert} from 'react-native'
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
import wallpaper from '../../../assets/wallpaper.png';
import { deleteGroups, getAllGroups, getMyGroups, getOtherGroups, joinGroup } from '../../../services/Conversation';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Games from '../../../components/Games';
import BookingGames from '../../../components/BooingGames';

let globalSelectedUser = []

const FirstRoute = (navigation) => {
  const myGameList = useSelector(state => state?.myGameList.myGamesList)  
  const [onlyMyGames , setOnlyMyGames] = useState([])

  useEffect(()=>{ 
    const filterOut = myGameList.filter(item => item.isBooking == false)
    console.log(filterOut)
    setOnlyMyGames(filterOut)
  }, [])

  return  (
    
    <ImageBackground
    source={wallpaper}
    style={[styles.scene, { paddingHorizontal : "3%" , paddingVertical : "3%"}]} >
                      {
                                !myGameList.loading ? 
                              
                               <FlatList 
                            
                               showsVerticalScrollIndicator = {false}
                               data = {onlyMyGames}
                               contentContainerStyle = {{paddingBottom : 70}}

                               renderItem = {({item , index}) =>{
                                   return (
                                    <View 
                                    style={{width : "100%", marginBottom : 20}}>
                                        {
                                            item.isBooking ? 
                                            <BookingGames  navigation = {navigation} myGameList = {item} hide = {true} /> : 
                                      <Games navigation = {navigation} myGameList = {item} hide = {true} />

                                        }
                                    </View>
                                   )
                               }}
                               />
                                : null
                            }
    </ImageBackground>
  )
};
   
  const SecondRoute = (navigation) => {
  
    const myGameList = useSelector(state => state?.myGameList.myGamesList)  
    const [onlyMyGames , setOnlyMyGames] = useState([])
  
    useEffect(()=>{ 
      const filterOut = myGameList.filter(item => item.isBooking == true)
      console.log(filterOut)
      setOnlyMyGames(filterOut)
    }, [])
  
    return  (
      
      <ImageBackground
      source={wallpaper}
      style={[styles.scene, { backgroundColor: "white" , paddingHorizontal : "3%" , paddingVertical : "3%"}]} >
                        {
                                  !myGameList.loading ? 
                                
                                 <FlatList 
                              
                                 showsVerticalScrollIndicator = {false}
                                 data = {onlyMyGames}
                                 contentContainerStyle = {{paddingBottom : 70}}
                                 renderItem = {({item , index}) =>{
                                     return (
                                      <View 
                                      style={{width : "100%" , marginBottom : 10 }}>
                                          {
                                              item.isBooking ? 
                                              <BookingGames  navigation = {navigation} myGameList = {item} hide = {true} /> : 
                                        <Games navigation = {navigation} myGameList = {item} hide = {true} />
  
                                          }
                                      </View>
                                     )
                                 }}
                                 />
                                  : null
                              }
      </ImageBackground>
    )
  }
   
  const initialLayout = { width: Dimensions.get('window').width };

const GameTypes = ({modalVisible , setModalVisible  , setLocation , navigation, setSelectedUser}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'My Games' },
      { key: 'second', title: 'My Bookings' },
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

export default GameTypes

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
