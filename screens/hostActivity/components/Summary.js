import React from 'react'
import { FlatList, Image, StyleSheet, Text, View, } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, imageStyle } from '../../../GlobalStyles'
import locationIcon from '../../../assets/location_pin.png'
import calendar from '../../../assets/calendar.png'
import clock from '../../../assets/clock.png'
import running from '../../../assets/running.png'
import profile from '../../../assets/profile.png'
// import { useSelector } from 'react-redux';
import { webURL } from '../../../services/BaseURL'
import ageIcon from '../../../assets/age-group.png'
import skillsIcon from '../../../assets/skills.png'
import costIcon from '../../../assets/wallet.png'
import infoIcon from '../../../assets/info.png'
import checkList from '../../../assets/checklist.png'
import paymentTypeIcon from '../../../assets/paymentType.png'
import moment from 'moment'

const Summary = ({
    selectedSport ,location,selectedFacility,
    additionalInfo,startTime, endTime ,skills,
    eventType,paymentType,price,pitchDetail,
    total , confirmed ,selectedDate , age
}) => {
    // const userDetail = useSelector(state => state?.userDetail.userDetail)

    // Dummy userDetail data
    const userDetail = {
        profilePic: '',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 30
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const stringReduce = (text , count ) => {
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    return (
        <View style={{paddingHorizontal : "3%", marginBottom: 30}}>
           <View style={styles.card}>

            <View style={styles.pictureContainer}>
                <View style={styles.circle}>
                <Image 
                style={{width : "100%" , height : "100%" , resizeMode : "cover"}}
                source={userDetail.profilePic == "" ? profile : {uri : `${webURL}${userDetail.profilePic}`}}
                />
                </View>
            </View>
            
            <View style={styles.detailContainer}>
                <Text style={{fontWeight : "bold" , fontSize : RFValue(14)}}>{capitalizeFirstLetter(userDetail.firstName)} {capitalizeFirstLetter(userDetail.lastName)}</Text>
                <Text>ORGANIZER</Text>
                <Text>{capitalizeFirstLetter(userDetail.gender)} | {userDetail.age}</Text>
            </View>

            <View style={styles.sportsContainer}>
                <View style={styles.sport}>
                    <Image 
                    style={{width : "65%" , height : "65%" , resizeMode : "contain" , tintColor : colors.light}}
                    source={{uri : `${webURL}${selectedSport.logo}`}}
                    />
                </View>
                <View style={{paddingVertical : "5%"}}>
                <Text style={{fontWeight : "bold", fontSize : RFValue(9)}}>{selectedSport.name}</Text>
                </View>
            </View>
           </View>

           <View style={styles.fieldContainer}>
           <View style={[ styles.fieldContainer, {width : "90%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "2.5%"}}>
               <View style={styles.icon}>
                    <Image
                    source={locationIcon}
                    style={imageStyle}
                    />
                   </View>
                 </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>{stringReduce(location.name,30)}</Text>
                    <Text>{pitchDetail}</Text>
                </View>
           </View>
           </View>
               
           <View style={styles.fieldContainer}>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={calendar}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Date</Text>
                    <Text>{moment.utc(selectedDate).format('MM-DD-YYYY')}</Text>
               </View>
           </View>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={clock}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Time</Text>
                    <Text>{startTime} - {endTime}</Text>
               </View>
           </View>
           </View>
               
           <View style={styles.fieldContainer}>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={ageIcon}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Age Group</Text>
                    <Text>{age.from} - {age.to}</Text>
               </View>
           </View>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={skillsIcon}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Skills</Text>
                    <Text>{skills}</Text>
               </View>
           </View>
           </View>
               
           <View style={styles.fieldContainer}>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={running}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Total Players</Text>
                    <Text>{total}</Text>
               </View>
           </View>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={running}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Confirm Players</Text>
                    <Text>{confirmed}</Text>
               </View>
           </View>
           </View>
               
           <View style={styles.fieldContainer}>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={costIcon}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Cost Per Player</Text>
                    <View style={{flexDirection : 'row' , paddingHorizontal : 10 , paddingVertical : 3}}>
                        <Text style={{color : "black" , fontSize : 15}}>{price}</Text>
                        <Text style={{color: "black" , fontSize : 10, alignSelf : "flex-end", marginLeft : 4 }}>PKR</Text>
                    </View>  
               </View>
           </View>
           <View style={[ styles.fieldContainer, {width : "49%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={paymentTypeIcon}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Payment Type</Text>
                    <Text>{paymentType}</Text>
               </View>
           </View>
           </View>

           <View style={[styles.fieldContainer ]}>
           <View style={[ styles.fieldContainer, {width : "100%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "2.5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={checkList}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View style={{width  : "100%"}}>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Venue Facilities</Text>
                    <View style={{ width : "100%" , height : "65%" }}>
                 {
                     selectedFacility.length > 0 ? 
                     <FlatList
                     data={selectedFacility}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     keyExtractor={item => item.name}
                     contentContainerStyle={{paddingRight : 30}}
                     renderItem={({item})=> ( 
                        <View style={{flexDirection : "row" ,alignItems : "center" ,
                            justifyContent  :'center', backgroundColor : colors.light, height : "60%",
                            top : "8%",
                             paddingHorizontal : RFValue(5) , marginRight : 10 , borderRadius : 40}}>
                          <Image source={{ uri : `${webURL}${item.logo}`}}
                            style={{resizeMode : "contain", marginRight:5 , tintColor :"white" , width : RFValue(13) , height : RFValue(13)}} />
                           <Text style={{color : "white"}}>{item.name}</Text>
                        </View>
                     )}
                     /> : 
                     <Text>No facilities Selected</Text>
                 }
                    </View>
               </View>    
           </View>
           </View>

           <View style={[styles.fieldContainer ]}>
           <View style={[ styles.fieldContainer, {width : "100%" , height : "100%" , borderBottomWidth : 0, justifyContent : "flex-start"}]}>
               <View style={{paddingHorizontal : "2.5%"}}>
                   <View style={styles.icon}>
                    <Image
                    source={infoIcon}
                    style={[imageStyle , {tintColor : colors.light}]}
                    />
                   </View>
               </View>
               <View style={{width  : "100%"}}>
                    <Text style={{fontSize : RFValue(12) , color : colors.light , fontWeight : "bold"}}>Additional Info</Text>
                    <View style={{ width : "100%" , height : "65%" }}>
                        <Text>{additionalInfo ? additionalInfo : 'No additional info'}</Text>
                    </View>
               </View>    
           </View>
           </View>
      
        </View>
    )
}

export default Summary

const styles = StyleSheet.create({
    card : {
        backgroundColor : "#bfbfbf52",
        height : RFValue(65),
        flexDirection : "row",
        borderRadius : 5
    },
    pictureContainer : {
        width : "25%",
        height : "100%", 
        justifyContent : "center",
        alignItems : "center"
    },
    circle : {
        width : RFValue(55),
        height : RFValue(55),
        borderRadius : 50,
        overflow : "hidden"
    },
    detailContainer : {
        width : "55%",
        height : "100%",
        justifyContent  :"center",
        paddingHorizontal : "3%"
    },
    notSelected : {
        borderRadius : RFValue(14),
        backgroundColor : "red",
        width : 120,
        // paddingHorizontal:"4%",
        marginRight : "2%",
        // marginBottom : RFValue(7),
        height : RFValue(27),
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "row"
    },
    icon : {
        height : RFValue(14),
        width : RFValue(14),
    },
    sportsContainer : { 
        width : "20%",
        height : "100%",
        justifyContent : "center",
        alignItems : "center"
    },
    sport : { 
        width  : RFValue(35),
        height : RFValue(35),
        borderRadius : 50,
        borderColor : colors.light,
        borderWidth : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    fieldContainer : {
        height : RFValue(55),
        flexDirection : "row",
        alignItems : "center",
        borderBottomWidth : 1,
        borderColor : "lightgrey",
        justifyContent : "space-between"
    }
})
