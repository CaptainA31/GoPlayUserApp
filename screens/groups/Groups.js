import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import { colors, screen } from '../../GlobalStyles'
import GroupTypes from './components/GroupTypes'
import addIcon from '../../assets/add.png'
import wallpaper from '../../assets/wallpaper.png'

// import { useSelector, useDispatch } from 'react-redux';

const Groups = ({navigation}) => {
    // const dispatch = useDispatch();
    // const groupData = useSelector(state => state.groupData);

    return (
        <ImageBackground
        source={wallpaper}
        imageStyle={{width: "100%", height: "100%", resizeMode: "cover"}}
        style={screen}>
            <Header
                heading={"My Groups"}
                onBack={() => navigation.pop()} 
            />
            <View style={{ height: "80%" }}>
                <GroupTypes navigation={navigation} />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("createGroup")}
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <View style={{width: 25, height: 25, justifyContent: "center"}}>
                        <Image 
                            source={addIcon}
                            style={{width: "80%", height: "80%", resizeMode: "contain", tintColor: colors.light}}
                        />
                    </View>
                    <Text>Create Group</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Groups

const styles = StyleSheet.create({
    // Add your styles here if needed
})
