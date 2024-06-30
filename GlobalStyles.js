
export const colors = {
  // light: '#38B000',
  dark : '#fcfcfc' ,
  light: '#c3ee98',
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
    overflow : "hidden"
}

export const imageStyle = {
    width : "100%" , height : "100%" , resizeMode : "contain"
}


export const capitalizeFirstLetter =(string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

export  const stringReduce= (text , count )=>{
    return text.slice(0, count) + (text.length > count ? "..." : "");
}