import React, { useEffect, useState } from 'react';
import {View , Text , StyleSheet, Image, TouchableOpacity, ActivityIndicator,ScrollView, KeyboardAvoidingView} from 'react-native'
import logo from '../../assets/logo.png'
import { OutlinedTextField } from 'rn-material-ui-textfield';
import ScreenLayout from '../../components/ScreenLayout';
import { RFValue } from 'react-native-responsive-fontsize';
import MessageModal from '../../components/MessageModal';
import { colors } from '../../GlobalStyles';
import PhoneInput from "react-native-phone-number-input";
import twitter from '../../assets/visibility.png';
import AlertBox from '../../components/AlertBox';

const SignUp = ({navigation})=> {
  const [name , setName ] = useState('')
  const [email , setEmail ] = useState('')
  const [pass , setPass ] = useState('')
  const [confirmPass , setConfirmPass ] = useState('')
  const [phone , setPhone ] = useState('')
  const [error , setError] = useState (null)
  const [modalVisible, setModalVisible] = useState(false);
  const [message , setMessage] = useState()
  const [loading , setLoading] = useState(false)
  const [country , setCountry] = useState()
  const [passVisible , setPassVisible] = useState(true)
  const [confirmVisible , setConfirmVisible] = useState(true)

  useEffect(()=> {

  },[])

  const handleSignUp = ()=> { 

  }

  return (
<ScreenLayout >
{/* <MessageModal 
setModalVisible= {setModalVisible} 
modalVisible = {modalVisible} 
message = {message}
/> */}
        <AlertBox 
            alertBox={modalVisible}
            setAlertBox={setModalVisible} 
            title={"Error"}
            message={message}
            />
  {/* <Loader value ={loading} /> */}
<View style ={styles.logoContainer}>
        <Image source = {logo} style = {styles.logo} />
        <Text style = {styles.h2}>BUSINESS APP</Text>
      </View>
      <ScrollView style = {styles.loginContainer}>
          <Text style = {styles.h3}>Sign Up To Continue</Text>
          <View style = {{marginTop : "1%" , paddingBottom : "2%"}}>
          <OutlinedTextField
        lineWidth = {1}
        tintColor = "white"
        autoCapitalize = "none"
        baseColor = "white"
        textColor = "white"
        inputContainerStyle = {styles.input}
        onChangeText = {(event) => setName(event)}
        label = "Name"
        />
        </View>
                <View style = {{marginTop : "1%" , paddingBottom : "2%"}}>
        <OutlinedTextField
        lineWidth = {1}
        tintColor = "white"
        baseColor = "white"
        autoCapitalize = "none"
        textColor = "white"
        inputContainerStyle = {styles.input}
        onChangeText = {(event) => setEmail(event)}
        label = "Email"
        />
        </View>
        <View style = {{justifyContent : "center" ,marginTop : "2%" , marginBottom : "5%"}}>
        <View style = {styles.icon}>
<TouchableOpacity
accessible=  {true}
onPressIn = {()=> setPassVisible(false)}
onPressOut = {()=>setPassVisible(true)}
// onPress = {()=>setVisible(!visible)}
style= {{width : RFValue(40) , height : RFValue(40) ,zIndex : 1000 , justifyContent : "center"}}
>
<Image 
source = {twitter}
style = {styles.iconImage}
/>
</TouchableOpacity>
</View>
        <OutlinedTextField
        tintColor = "white"
        autoCapitalize = "none"
        baseColor = "white"
        textColor = "white"
        inputContainerStyle = {styles.input}
        onChangeText = {(event) => setPass(event)}
        secureTextEntry = {passVisible}
        label = "Password"
        />
        </View>
        <View style = {{justifyContent : "center" ,marginTop : "0%" , marginBottom : "5%"}}>
        <View style = {styles.icon}>
<TouchableOpacity
accessible=  {true}
onPressIn = {()=> setConfirmVisible(false)}
onPressOut = {()=>setConfirmVisible(true)}
// onPress = {()=>setVisible(!visible)}
style= {{width : RFValue(40) , height : RFValue(40) ,zIndex : 1000 , justifyContent : "center"}}
>
<Image 
source = {twitter}
style = {styles.iconImage}
/>
</TouchableOpacity>
</View>
        <OutlinedTextField
        tintColor = "white"
        autoCapitalize = "none"
        baseColor = "white"
        textColor = "white"
        inputContainerStyle = {styles.input}
        onChangeText = {(event) => setConfirmPass(event)}
        secureTextEntry = {confirmVisible}
        label = "Confirm Password"
        />
        </View>
        <PhoneInput
            defaultCode="PK"
            layout="first"
        
            onChangeFormattedText={(text) => {
              setPhone(text)
            }}
            countryPickerButtonStyle  = {{width : "17%", justifyContent : "flex-end" }}
            codeTextStyle= {{color : "white" }}
            textInputStyle = {{color : "white" ,top : "0.5%" , height : RFValue(35) }}
            textContainerStyle = {{backgroundColor : "#cb383700", paddingLeft : "2%"  }}
            containerStyle = {{backgroundColor : "#cb383700" , height : RFValue(55), borderWidth : 1, borderColor : "white" , 
          borderRadius : RFValue(4)
          }}
          />
        {/* <View style = {{marginTop : "1%" , paddingBottom : "4%"}}>
        <OutlinedTextField
        tintColor = "white"
        baseColor = "white"
        textColor = "white"
        inputContainerStyle = {styles.input}
        onChangeText = {(event) => setPhone(event)}
        value = {phone}
        onFocus = {()=>onFocus()}
        keyboardType='numeric'
        label = "Phone Number"
        />
        </View> */}
        <Text style={{color : "red", textDecorationLine : 'underline' ,paddingBottom : "2%"}}>{error}</Text>

        <TouchableOpacity onPress = {handleSignUp} disabled = {loading}>
        <View style = {styles.button}>
          {
            loading ? 
            <ActivityIndicator size = {"large"} color = {colors.light} />
            :
            <Text style = {styles.buttonText}>Sign Up</Text>
          }
        </View>
        </TouchableOpacity>
      
        
      </ScrollView>

</ScreenLayout>
   )
}
const styles = StyleSheet.create({
  logoContainer : {
    height : "30%",
   justifyContent : "center",
   alignItems : "center",
  },
  logo : {
      width : "70%" , height : "40%"
  },
  h2 : {
    fontSize : RFValue(18), color : "white"
  },
  loginContainer : {
      height : "70%",
      paddingHorizontal : "10%"
  } ,
  h3 : {
      fontSize : RFValue(16) ,
      color : "white" , 
      paddingBottom : "6%"
  },
  subtitle : {
      fontSize : RFValue(15), color : "white",
      alignSelf : "flex-end",
      paddingBottom : "15%"
  },
  button : {
      borderColor : "white", backgroundColor : "white",
      borderWidth : 1,
      height : RFValue(50),
      width : "100%",
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 4
  },
  buttonText : {
        color : "#422361"
  },
  input : {
    height : RFValue(52),
    alignItems : "center"
  },
  iconImage : {
    width : "50%", height : "50%" , resizeMode : "contain",
    bottom : "10%",
    tintColor : "white"
},
icon : {
  position : "absolute" , alignSelf : "flex-end" ,
  width : "15%",
  height : "85%",
    justifyContent : "center",
    alignItems : "center",
},
})

export default SignUp;