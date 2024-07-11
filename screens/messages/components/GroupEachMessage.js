import React from 'react'
import { StyleSheet, Text, View , Image, NativeAppEventEmitter } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, imageStyle } from '../../../GlobalStyles'
import leftArrow from '../../../assets/leftArrow.png'


const GroupEachMessage= ({myMsg , text , time , name}) => {
    return (
        <>
        {
            myMsg ? 
            <View style  ={styles.myMsg}>
            <Text style = {styles.text}>{text}</Text>
            <Text style = {{alignSelf : "flex-end" , color : "lightgrey" , top : -4}}>{time}</Text>

        </View>
        : 
        <>
       <Text style ={{fontSize : RFValue(12) , fontStyle :"italic"}}>{name}</Text>
        <View style  ={styles.otherMsg}>    
        <Text style = {styles.text}>{text}</Text>
        <Text style = {{alignSelf : "flex-end" , color : "lightgrey" , top : -4}}>{time}</Text>
    </View>
            </>
        }

        </>
    )
}

export default GroupEachMessage

const styles = StyleSheet.create({
    myMsg : {
        alignSelf : "flex-end",
        backgroundColor : colors.light,
        maxWidth : "90%",
        flexDirection : "row",
        borderRadius : 15,
        marginBottom : 10,
        paddingRight : 10,
        borderTopRightRadius : 4
    },
    otherMsg : {
        alignSelf : "flex-start",
        backgroundColor : "#5c5c5c",
        maxWidth : "90%",
        flexDirection : "row",
        borderRadius : 15,
        marginBottom : 10,
        paddingRight : 10,
        borderTopLeftRadius : 4
    },
    text : {
        paddingVertical : 10,
        color : "white",
        paddingHorizontal : 20,
        fontSize : RFValue(13)
    }
})
