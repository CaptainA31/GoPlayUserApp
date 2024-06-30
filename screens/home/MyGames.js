import React from 'react'
import { ImageBackground, StyleSheet, Text, View , Image} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, imageStyle } from '../../GlobalStyles'
import profile from '../../assets/profile.png'
import locationIcon from '../../assets/location_pin.png'
import calendar from '../../assets/calendar.png'

const MyGames = () => {
    return (
        <View>
            <View style={{flexDirection : "row"  , justifyContent : "space-between" , alignItems :"center"}}>
            <Text style={styles.heading}>My games</Text>
            <Text style = {styles.viewAll}>View all</Text>
            </View>
            <View style = {styles.cardContainer}>
                <View style={styles.card}>
                    <View style = {styles.date}>
                    <Text style={{color: "white" ,fontSize :RFValue(12) ,fontWeight : "bold"}}>06</Text>
                    <Text style={{color: "white", top : "-5%" , fontSize : RFValue(10)}}>Going</Text>
                    </View>
                <View style = {{width : "30%" , 
               
                height : "100%" , alignItems : "center"
                }}>
                <ImageBackground
               source = {profile}
               imageStyle = {{   borderRadius : 10,}}
               style = {styles.userPic}>
                <View style = {styles.sportIcon}>

                </View>
               </ImageBackground>
               <Text style = {{fontSize : RFValue(10), color : "black"}}>Sarmad Shakeel</Text>
               <Text style = {{fontSize : RFValue(11), fontWeight : "bold"}}>Organizer</Text>
               
                         </View>
                <View style={{width : "70%"  , height : "100%" , paddingTop : "5%"}}>
                    <Text style = {{fontSize : RFValue(15)}}>Cricket Mania</Text>
                    <View style={{flexDirection : "row" , marginTop : "2%"}}>
                        <View style={{width : RFValue(12) , height : RFValue(12) , marginRight : "1%" , top : "1%"} }>
                            <Image 
                            source = {locationIcon}
                            style = {imageStyle}
                            />

                        </View>
                        <View style = {{width : "80%"}}>
                          <Text style={{color : "grey" , fontSize : RFValue(9)}}>
                              Bay Square Building 3 , Business Bay, Dubai, UAE
                          </Text>
                        </View>

                    </View>
                    <View style={{flexDirection : "row" , marginTop : "2%" , width : "70%", justifyContent :"space-between" , alignItems :"center" }}>
                        <View style = {{flexDirection : "row"}}>
                        <View style={{width : RFValue(11) , height : RFValue(12) , marginRight : "4%" } }>
                        <Image 
                        source = {calendar}
                        style = {imageStyle}
                        />
                        </View>
                        <Text style={{color : "grey" , fontSize : RFValue(9)}}>22 Oct-2020</Text>
                        </View>
                        <View style = {styles.verticalDivider}/>

                        <View style = {{flexDirection : "row"}}>
                        <View style={{width : RFValue(11) , height : RFValue(12) , marginRight : "4%" } }>
                        <Image 
                        source = {calendar}
                        style = {imageStyle}
                        />
                        </View>
                        <Text style={{color : "grey" , fontSize : RFValue(9)}}>22 Oct-2020</Text>
                        </View>
                    </View>

                </View>
                </View>
            </View>
        </View>
    )
}

export default MyGames

const styles = StyleSheet.create({  
    heading : {
        fontSize : RFValue(16),
        fontWeight : "bold"
    },
    viewAll : {
        color : "grey",
    },
    cardContainer : {
        marginTop : RFValue(6),
        width : "100%",
        height : RFValue(150),
        paddingHorizontal : "2%",
        justifyContent : "center"
    },
    card  : {
            borderColor : "lightgrey",
            borderRadius : 10,
            borderWidth : 1,
            height : "85%",
            flexDirection : "row"
    },
    date : {
        backgroundColor : colors.light,
        height : RFValue(32), width : RFValue(45),
        position : "absolute",
        zIndex : 100,
        left : "80%",
        top : "-10%",
        borderRadius : RFValue(5),
        justifyContent : "center",
        alignItems : "center"
    },
    userPic : {
        height : RFValue(70),
        width : RFValue(65),
        borderRadius : 10,
        marginTop : "12%",
        marginBottom : "15%",
        justifyContent : 'flex-end',
        alignItems : "center"
    },
    sportIcon : { 
        backgroundColor : "white",
        width : RFValue(30), height: RFValue(30),
        borderRadius : 50,
        top : "20%", zIndex : 100,
        borderColor : "lightgrey",
        borderWidth : 1
    },
    verticalDivider : {
        height : RFValue(12),
        width : 1.2,
        marginRight : 10,
        backgroundColor : "grey"
    },
})
