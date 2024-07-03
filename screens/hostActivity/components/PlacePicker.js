import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete  } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Modal from 'react-native-modal'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../../GlobalStyles';
import Button from '../../../components/Button';


const PlacePicker = ({modalVisible , setModalVisible  , setLocation}) => {
  const API_KEY = 'AIzaSyAH-3QThDt8_SRK-X66WRcgG1imIDE81hQ'
    const handleLocation = (data)=>  {
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${data}`)
      .then((res)=> { 
        console.log(res.data.result.formatted_address)
        console.log(res.data.result.geometry.location)
        let data =  {
          name : res.data.result.formatted_address,
          lat : res.data.result.geometry.location.lat,
          long : res.data.result.geometry.location.lng
        }
        setLocation(data)
        setModalVisible(false)
      })
    }
    return (
          <Modal
          isVisible={modalVisible}
          useNativeDriverForBackdrop
          hasBackdrop ={false}
          animationInTiming = {300}
          animationOutTiming ={300}
          onSwipeComplete = {()=> setModalVisible(false)}
        style ={{margin : 0 }}
         onBackButtonPress={() => {
       
           setModalVisible(false);
         }}
          style = {{height : "100%" }}>
            <View style={{ height : RFValue(380) , paddingVertical : "2%", backgroundColor : "white",
            borderColor : "lightgrey" , borderWidth : 1 , paddingHorizontal : "3%" , borderRadius : 10,
            shadowColor: "#000",
            shadowOffset: {
          width: 2,
          height: 4,
            },
            shadowOpacity: 3,
            shadowRadius: 40.46,
            elevation: 10,
          }}>
            <Text style={{fontSize  :RFValue(16) , fontWeight : "bold"}}>Search Location</Text>
               <GooglePlacesAutocomplete
      placeholder='Search'
      
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        handleLocation(data.place_id)
      }}
      styles = {{textInput : {backgroundColor : '#f7f7f7' , color : "#181818", marginTop : "2%", borderWidth :1}}}
      query={{
        key: API_KEY,
        language: 'en',
        components: 'country:pak'
      }}
    />    
    <View style={{height : RFValue(40) , paddingHorizontal : "20%"}}>
      <Button text = {"Confirm"} />
      </View>
    </View> 
              </Modal>

    )
}

export default PlacePicker

const styles = StyleSheet.create({})
