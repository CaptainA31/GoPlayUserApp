import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity , Image, BackHandler} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { imageStyle } from '../../../GlobalStyles'
import male from '../../../assets/male.png'
import female from '../../../assets/woman.png'

const Step4 = ({gender , setGender}) => {


    const handleGender = (item)=> {
        setGender(item)
    }

    return (
        <View style={{ justifyContent : "center", height : "100%",  marginHorizontal : "1%"}}>
                <Text style = {styles.h3}>And Your Gender?</Text>

                <View style = {{flexDirection : "row", alignItems : "center" ,justifyContent : "space-around" , paddingHorizontal : "10%"}}>
                    <TouchableOpacity 
                    onPress = {()=>handleGender("male")}
                    style= {[styles.circle , {backgroundColor : gender == "male" ? "grey" : null}]}>
                    <Image 
                    style = {{
                        width : "80%" , 
                        resizeMode : "contain",
                        height : "65%",    
                        tintColor : gender == "male" ? "white": "grey"    
                    }   }
                    source = {male}
                    />
                    </TouchableOpacity>
              
                    <TouchableOpacity
                    onPress = {()=>handleGender("female")}
                    style= {[styles.circle , {backgroundColor : gender == "female" ? "grey" : null }]}>
                    <Image 
                    style = {{
                    width : "60%" , 
                    resizeMode : "contain",
                    height : "65%",
                    tintColor : gender == "female" ? "white": "grey"    
                
                }}
                    source = {female}
                    />
                </TouchableOpacity>
                
                </View>
           
           
                      
        </View>
    )
}

export default Step4

const styles = StyleSheet.create({
    circle : {
        width : RFValue(100),
        height : RFValue(100),
        borderRadius : 100,
        borderColor : "grey",
        borderWidth : 2,
        justifyContent : "center",
        alignItems : "center"
    },
    h2 : {
        marginLeft : "3%",
        top: "0.5%",
        fontSize : RFValue(17),
        color : "grey" 
    },  
    h3 : {
        marginBottom : "5%",
        fontSize : RFValue(18),
        color : "grey",
    }
})
