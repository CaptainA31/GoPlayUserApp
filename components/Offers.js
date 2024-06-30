import React from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../GlobalStyles'
import offerbackground from '../assets/sportsCollection.jpg'

const OfferComponent= ({data , navigation}) => {
    return (
        <FlatList 
        data = {data}
        renderItem={({item , index})=> { 
            return (
                <ImageBackground 
                source={offerbackground}
                imageStyle = {{width : "100%" , height : "100%" , resizeMode : "cover"}}
                style = {styles.card}
                >  
                <View style={{backgroundColor : "#652c9dc9" , height : "100%" , justifyContent : "center"}}>
                <View style={{flexDirection : "row" , alignItems : "center" , justifyContent  :"space-between"}}>
                <View  style = {[styles.whiteCircle , {right : "50%"}]}/>
                <Text style={{fontWeight : "bold" , fontSize : 19 , color : "white"}}>Get {item.discount}% on {item.facilityId.name}</Text>
                <TouchableOpacity
                onPress = {()=> navigation.navigate("bookAsActivity" , {facility : item.facilityId })}
                style = {styles.button}>
                    <Text style={{paddingHorizontal : "2%" , color : colors.light}}>Avail Offer</Text>
                </TouchableOpacity>
                <View  style = {[styles.whiteCircle , {left : "50%"}]}/>
                
                </View> 
                <View style={{flexDirection : "row" , backgroundColor  :"red", width : "100%", alignItems : "center" , justifyContent  :"space-between"}}>
                     
                    </View>
                </View>
        
                </ImageBackground>
            )
        }}  
        />
    )
}

export default OfferComponent

const styles = StyleSheet.create({
    card :  {
        height : 140 , 
        borderRadius : 20 , 
        overflow : 'hidden'
    },
    whiteCircle : { 
        width : 40 ,  height : 40,
        backgroundColor : "white",
        borderRadius : 50
    },
    button :  {
        backgroundColor  : colors.lightBlack,
      height : 30 , borderRadius : 20 , 
      justifyContent : "center",
      marginLeft : 7
    }
})