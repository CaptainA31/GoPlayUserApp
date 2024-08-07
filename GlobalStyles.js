import { Platform, StatusBar } from "react-native";

export const colors = {
  light: "#38B000",
  dark : '#fcfcfc' ,
  // light: '#c3ee98',
  // dark : "#1D1A21" ,
  shade: '#ffebfb',
  lightBlack: '#CECECE',
  grey: '#787878',
  white: '#FFFFFF',
  lightGreen: '#E9FFF4',
  lightGreen2: '#ECF8E6',
};

export const screen = {
    height : "100%",
    backgroundColor : "white",
    overflow : "hidden",
    resizeMode: "contain",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
}

export const imageStyle = {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // marginTop: 12,
    marginLeft: -10
}


export const capitalizeFirstLetter =(string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

export  const stringReduce= (text , count )=>{
    return text.slice(0, count) + (text.length > count ? "..." : "");
}