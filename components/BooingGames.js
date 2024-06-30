import React from 'react'
import { ImageBackground, StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { capitalizeFirstLetter, colors, imageStyle, stringReduce } from '../GlobalStyles'
import profile from '../assets/profile.png'
import locationIcon from '../assets/location_pin.png'
import calendar from '../assets/calendar.png'
import {LinearGradient} from 'expo-linear-gradient'
import TimeGlass from '../assets/hourglass.png'
import bookingIcon from '../assets/bookingId.png'
import clock from '../assets/clock.png'
import running from '../assets/running.png'
import moment from 'moment'
import { calculateBookingDuration, calculateDuration } from '../services/HostActivity'
import { webURL } from '../services/BaseURL'
import { useDispatch , useSelector } from 'react-redux';

const BookingGames = ({hide , myGameList , handleJoinGame , handleLeaveGame  , disable , navigation , isPast}) => {
   
    const userDetail = useSelector(state => state?.userDetail.userDetail)
    
    const alreadyJoined = (element)=> { 
        const exist = element.playerJoined.find(item => item == userDetail._id )
        if (exist) {
            return true
        }else {
            return false
        }

    }

    return (
        <TouchableOpacity
        onPress = {()=> navigation.navigate("bookingSummary" , {myGameList : myGameList})}
        >
 
            <View style = {[styles.cardContainer , {height : hide ? RFValue(140) : RFValue(175)}]}>
                <View style={styles.card}>
            {
                hide &&    
                 <View style = {styles.date}>
                <Text style={{color: "white" ,fontSize :RFValue(10) }}>Booking</Text>
                </View>
            }

                <View style = {{width : "30%" , 
                height : "100%" , alignItems : "center"
                }}>
                <ImageBackground
                    source = {myGameList?.organizer.profilePic == "" ? profile : {uri : `${webURL}${myGameList?.organizer.profilePic}`}}
                    imageStyle = {{   borderRadius : 10,}}
               style = {styles.userPic}>
                <View style = {styles.sportIcon}>
                    <Image 
                    source = {{uri : `${webURL}${myGameList?.selectedSport.logo}`}}
                    style = {{width : "70%" , height : "70%" , resizeMode : "contain" , tintColor : colors.light}}
                    />
                </View>
               </ImageBackground>
               <Text style = {{fontSize : RFValue(10), color : "black"}}>{ stringReduce(`${myGameList?.organizer.firstName} ${myGameList?.organizer.lastName}` , 12)}</Text>
               <Text style = {{fontSize : RFValue(12), fontWeight : "bold"}}>Organizer</Text>

                </View>
                <View style={{width : "70%"  , height : "100%" , paddingTop : "5%"}}>
                    <Text numberOfLines = {2} style = {{fontSize : RFValue(15)}}>{capitalizeFirstLetter(myGameList?.activityName)}</Text>
                    <View style={{flexDirection : "row" , marginTop : "3%"}}>
                        <View style={{width : RFValue(11) , height : RFValue(12) , marginRight : "2%" , top : "1%"} }>
                            <Image 
                            source = {locationIcon}
                            style = {imageStyle}
                            />

                        </View>
                        <View style = {{width : "80%"}}>
                        <Text numberOfLines={1} style={{color : "grey" , fontSize : RFValue(9)}}>
                              {myGameList?.location.name}
                          </Text>
                        </View>

                    </View>
                    <View style={{flexDirection : "row" , marginTop : "2%" , width : "85%", justifyContent :"space-between"}}>
                        <View style = {{flexDirection : "row" , alignItems : "center"}}>
                        <View style={{width : RFValue(12) , height : RFValue(11) , marginRight : "6%" } }>
                        <Image 
                        source = {calendar}
                        style = {[imageStyle, {tintColor : colors.light}]}
                        />
                        </View>
                        <Text style={{fontSize : RFValue(9)}}>{moment(myGameList?.selectedDate).format('DD-MMM-YYYY')}</Text>
                        </View>
                        <View style = {styles.verticalDivider}/>

                        <View style = {{flexDirection : "row" , alignItems : "center"}}>
                        <View style={{width : RFValue(12) , height : RFValue(11) , marginRight : "4%" } }>
                        <Image 
                        source = {clock}
                        style = {[imageStyle ,  {tintColor : colors.light}]}
                        />
                        </View>
                        <Text style={{fontSize : RFValue(9)}}>{moment.utc(myGameList?.startTime).format('hh:mm A')} - {moment.utc(myGameList?.endTime).format('hh:mm A')}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection : "row" , marginTop : "2%" , alignItems : "center"}}>
                        <View style={{width : RFValue(11) , height : RFValue(12) , marginRight : "2%" } }>
                            <Image 
                            source = {bookingIcon}
                            style = {{height : "100%" , width : "100%" , resizeMode : "contain" , tintColor : colors.light}}
                            />

                        </View>
                        <View style = {{width : "80%"}}>
                        <Text numberOfLines={1} style={{color : "#333", fontSize : RFValue(10)}}>
                             Booking id : GP-{myGameList?.bookingId}
                          </Text>
                        </View>

                    </View>

                    <View style = {{flexDirection : "row" , marginTop : "2%"}}>
                        <View style={{width : RFValue(12) , height : RFValue(11) , marginRight : "2%" } }>
                        <Image 
                        source = {TimeGlass}
                        style = {[imageStyle, {tintColor : colors.light}]}
                        />
                        </View>
                        <Text style={{fontSize : RFValue(9)}}>{calculateBookingDuration(myGameList?.startTime , myGameList?.endTime)}</Text>
                        </View>

                    
                
           {
               !hide &&  
                 <View style = {styles.price}>
               <Text style = {{color : '#541595' , fontSize : RFValue(12)}} >PKR {myGameList?.price}</Text>
               </View>
           }


                </View>
                </View>
          {
              
              !hide ?
              alreadyJoined(myGameList) ? 
              <TouchableOpacity 
              disabled = {disable}
              onPress = {()=>handleLeaveGame(myGameList)}
              style ={{backgroundColor  :colors.light , height : "18%"}}>
              <LinearGradient 
                  colors = {[colors.light , colors.dark]}
                  style = {styles.button}
                  start={{x: 1, y: 0}} end={{x: 0, y: 0}}>
                 <Text style={{color : "white" ,fontSize : RFValue(11)}}>Leave Game</Text>
                    </LinearGradient>
                </TouchableOpacity> :
                 <TouchableOpacity 
                 disabled = {disable}
                 onPress = {()=>handleJoinGame(myGameList)}
                 style ={{backgroundColor  :colors.light , height : "18%"}}>
                 <LinearGradient 
                     colors = {[colors.light , colors.dark]}
                     style = {styles.button}
                     start={{x: 1, y: 0}} end={{x: 0, y: 0}}>
                    <Text style={{color : "white" ,fontSize : RFValue(11)}}>Join Game</Text>
                       </LinearGradient>
                   </TouchableOpacity> : null
          }
            </View>
        </TouchableOpacity>
    )
}

export default BookingGames

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
        height : RFValue(180),
        borderColor : "lightgrey",
        borderRadius : 10,
        borderWidth : 1,
    },
    card  : {
            height : "82%",

            flexDirection : "row",
    },
    date : {
        backgroundColor : colors.light,
        height : RFValue(20), width : RFValue(50),
        position : "absolute",
        zIndex : 100,
        left : "80%",
        top : "-6%",
        borderRadius : RFValue(5),
        justifyContent : "center",
        alignItems : "center"
    },
    userPic : {
        height : RFValue(70),
        width : RFValue(60),
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
        borderWidth : 1,
        alignItems : "center",
        justifyContent: 'center',
    },
    verticalDivider : {
        height : RFValue(16),
        width : 2,
        marginRight : 10,
        backgroundColor : "grey"
    },
    button : { 
        height : "100%" , width : "100%" ,
        alignItems : "center", justifyContent : "center",
    },
    price : { 
        position : "absolute",
        alignSelf : "flex-end",
        padding  : "2%",
        backgroundColor : "#be7fff2e",
        alignItems : "center",
        justifyContent : "center",
        marginRight : "3%",
        right : "2%",
        borderRadius : 5
    }
})
