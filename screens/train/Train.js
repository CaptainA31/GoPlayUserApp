import React , {useState}from 'react'
import { FlatList, ImageBackground, View , StyleSheet , Text , Image, Pressable , TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import trash from '../../assets/trash.png'
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
import TrainTypes from './components/TrainTypes';

const Train = ({navigation ,drawerAnimationStyle }) => {
    const [myFacilities , setMyFacility] = useState([])

    const onBack = ()=> {
        navigation.navigate("HOME")
    }

    useFocusEffect(
        React.useCallback(() => {  

            getAllTrain().then((res)=> {
                setMyFacility(res.data.train)
            })
       
          return () => null
        }, [navigation])
      )

    return (
        <View style = {{flex :1  , backgroundColor : "white"}}>


        <Header
         heading={"Train"}
         onBack={()=> navigation.pop()}
         />
         <TrainTypes navigation={navigation} />

     </View>
    )
}

export default Train

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
        fontSize : RFValue(16),
        color : colors.light,
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
