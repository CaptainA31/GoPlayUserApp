import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import { colors, screen } from '../../GlobalStyles'
import addIcon from '../../assets/add.png'
import RequestTypes from './components/RequestType'

const RequestFunds = ({navigation}) => {
    return (
        <View style={screen}>
            <Header
            heading={"Request Funds "}
            onBack={()=>navigation.pop()} />
            <View style={{backgroundColor : "red" , height : "100%"}}>
            <RequestTypes navigation = {navigation} />
            </View>

  
        </View>
    )
}

export default RequestFunds

const styles = StyleSheet.create({

})