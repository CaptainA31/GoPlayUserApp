import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import GameTypes from './components/GameTypes'

const ViewAllGames = ({navigation}) => {
    return (
        <View style = {{flex :1  , backgroundColor : "white"}}>
            <Header
            heading={"My Games/Bookings"}
            onBack={()=> navigation.pop()}
            />
            <GameTypes navigation={navigation} />
            <Text>View All Games</Text>
        </View>
    )
}

export default ViewAllGames

const styles = StyleSheet.create({})
