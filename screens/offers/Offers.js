import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import { colors } from '../../GlobalStyles'
import {getAllOffers, getBanners} from '../../services/Offers'
import OfferComponent from '../../components/Offers'
import Swiper from 'react-native-swiper'
import { webURL } from '../../services/BaseURL'
import wallpaper from '../../assets/wallpaper.png'

const Offers = ({navigation}) => {
    const [offers , setOffers] = useState([])

    useEffect(()=> { 
        getBanners().then(res => setOffers(res.data.banners))
    }, [])
    console.log(offers)
    return (
        <ImageBackground
        source={wallpaper}
        imageStyle ={{width : "100%" , height : "100%" , resizeMode : "cover"}}
        style = {{backgroundColor : "white" , flex :1}}>
            <Header heading={'Offers'} onBack={()=> navigation.pop()} />
            <View style={{paddingHorizontal : "3%" , marginTop : "3%" , height : "50%"}}>
                {/* <OfferComponent data={ offers } navigation={navigation} /> */}

                {
                 offers?.length > 0 &&
                 <Swiper 
                 autoplay={true}
                 loop={true}
                 autoplayTimeout= {10}
                 direction={'row'}
                 showButtons={false}
                 bounces={false}
                 showsPagination={false}
                 >
                     {
                         offers[0].Images.map((item)=> {
                             return (
                                <TouchableOpacity
                                onPress = {()=> navigation.navigate("bookDetail" , {facility : offers[0].facilityId })}
                                style = {styles.cardOffer}>
                               <Image 
                               source={{uri : `${webURL}${item.image}?time=${new Date()}` , cache : 'reload'}}
                               style={{width : "100%" , height : "100%"  , resizeMode : "cover" }}
                               />
                               </TouchableOpacity>
                             )
                         })
                     }
                 </Swiper>
             }
            </View>

        </ImageBackground>
    )
}

export default Offers

const styles = StyleSheet.create({
    card :  {
        height : 130 , 
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
      justifyContent : "center"
    },
    cardOffer :  {
        height : "40%",
        width : "100%", 
        borderRadius : 20 , 
        backgroundColor : '#2b1d3a96',
        overflow : 'hidden' 

    },
})
