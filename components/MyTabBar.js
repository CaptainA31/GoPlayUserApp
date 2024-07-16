import React from 'react';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../GlobalStyles';
import home from '../assets/home.png'
import play from '../assets/skate.png'
import bookings from '../assets/bookings.png'
import wallet from '../assets/wallet.png'

const MyTabBar = ({navigation , currentTab})=> { 
  const tabs = [{ name :"HOME" , icon : home} , {name : "PLAY" , icon : play} , {name : "BOOK" , icon : bookings} , { name : "WALLET" , icon : wallet}]


 const handleTabPress = (name)=> {
     navigation.navigate(name)
  }
    return (
        <LinearGradient 
        colors = {[colors.white , colors.white]}
        
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
         style = {styles.tabContainer}>
            <View style = {styles.tabs}> 
            {
                tabs.map((item )=> {
                    return (
                      <View key={item.name}>
                        <Pressable
                          onPress={() => handleTabPress(item.name)}
                          style={styles.tabButton}>
                          <Image
                            style={{
                              width: RFValue(18),
                              tintColor: colors.light,
                              height: RFValue(18),
                            }}
                            source={item.icon}
                          />

                          <Text style={styles.text}>{item.name}</Text>
                          {currentTab === item.name ? (
                            <View style={styles.bar} />
                          ) : null
                          
                          }
                          {/* <View style = {styles.bar}/> */}
                        </Pressable>
                      </View>
                    );
                } )
            }
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    tabContainer : {
        height : "100%",
    },
    tabs : {
        flexDirection : "row",
        flex : 1,
        alignItems : "center",
        justifyContent : "space-around",
    },
    text : {
        color : '#111111',
        fontSize : RFValue(9),
        marginTop : "10%"
    },
    tabButton : {
     paddingVertical : "15%",
        paddingHorizontal : "1%",
        alignItems : "center",
        // justifyContent : "space-between",
    },
    bar : {
        width : "120%",
        height : RFValue(2.5),
        backgroundColor : colors.light,
        borderRadius : 20,
        // top : "15%"
    }
})

export default MyTabBar