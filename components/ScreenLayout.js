import React from 'react';
import { Keyboard, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { colors } from '../GlobalStyles';

const ScreenLayout =({invert ,children})=> {
    return (
        <>
        {
            invert ? 
            <LinearGradient
            style = {{height : "100%"  }}
            colors={[colors.light  , colors.dark ] }
            >
                <Pressable onPress = {()=> Keyboard.dismiss()}>
                {children}
                </Pressable>
            </LinearGradient> 

            :
            <LinearGradient
            style = {{height : "100%"  }}
            colors={[colors.dark  , colors.light ] }>
                <Pressable onPress = {()=> Keyboard.dismiss()}>
                {children}
                </Pressable>
            </LinearGradient> 
        }
        </>
     
    )
}

export default ScreenLayout