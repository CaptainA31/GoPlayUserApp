import React , {useState}from 'react'
import { FlatList, ImageBackground, View , StyleSheet , Text , Image, Pressable , TouchableOpacity, Share} from 'react-native';
import Header from '../../components/Header';
import facebook from '../../assets/facebook.png'
import gmail from '../../assets/google.png'
import whatsapp from '../../assets/whatsapp.png'
import edit from '../../assets/create.png'
import { RFValue } from 'react-native-responsive-fontsize';
import locationIcon from '../../assets/location_pin.png';
import phoneIcon from '../../assets/smartphone.png';
import noFacility from '../../assets/noFacility.png'
import Animated from 'react-native-reanimated';
import { webURL } from '../../services/BaseURL';
import { colors, imageStyle } from '../../GlobalStyles';
import { SwipeListView } from 'react-native-swipe-list-view';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import { useFocusEffect } from '@react-navigation/core';
import MyTabBar from '../../components/MyTabBar';
import wallpaper from '../../assets/wallpaper.png'
import { getAllFacilities } from '../../services/Booking';
import { getAllTrain } from '../../services/Train';

const ViewTrain = ({navigation ,drawerAnimationStyle , route }) => {
    const [myFacilities , setMyFacility] = useState([])
    const item = route.params.facility
    const onBack = ()=> {
        navigation.navigate("HOME")
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message : `I have found this academy on GoPlay. Please check this out ${item.website}` ,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      const onIconShare = async(link)=> { 
        try {
            const result = await Share.share({
              message : `I have found this academy on GoPlay. Please check this out ${link}` ,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
      }

    return (
        <Animated.View style = {{height : "100%" , overflow : "hidden", backgroundColor : "white" , ...drawerAnimationStyle}}>
        <Header
        onBack = {onBack}
        heading = {"Train"} 
        // text ={"View Slots"}
        onTextPress = {()=> navigation.pop()}
        />
        <TouchableOpacity
        onPress={onShare}
        style={{
            height : RFValue(45), width :"97%" ,
             alignSelf : "center" , position : "absolute" , 
             bottom : 0 ,backgroundColor : colors.light , 
             marginBottom : "2%"
            }}
        >
        <Button text={"Share"} />
        </TouchableOpacity>

                <ImageBackground 
               imageStyle = {{width : "100%", height : "100%"}}
               source = {wallpaper}
               style = {{height : "82%" , backgroundColor : "white" , 
               paddingHorizontal : "3%" , marginRight : "1%"}}> 
         
           <View style={{height : 40 , marginTop : 10, flexDirection : "row" , justifyContent : "flex-end"}}>
                <TouchableOpacity style={styles.circle}>
                    <Image
                    source={facebook}
                    style={{width : "80%" , height : "80%" , resizeMode : "contain" , tintColor : colors.light}}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>onIconShare(item.google)}
                style={styles.circle}>
                <Image
                    source={gmail}
                    style={{width : "80%" , height : "80%" , resizeMode : "contain" , tintColor : colors.light}}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>onIconShare(item.whatsapp)}
                style={styles.circle}>
                <Image
                    source={whatsapp}
                    style={{width : "80%" , height : "80%" , resizeMode : "contain" , tintColor : colors.light}}
                    />
                </TouchableOpacity>
           </View>

              <Pressable 
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
                               
                               <Text> {item.description}</Text>
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
    </ImageBackground>
    </Animated.View>

    )
}

export default ViewTrain

const styles = StyleSheet.create({
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
        width : RFValue(30), height : RFValue(30),
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
