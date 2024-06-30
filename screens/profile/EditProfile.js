import React, { useEffect, useState } from 'react'
import {View , ScrollView , Text, Image ,StyleSheet , TextInput,  TouchableOpacity, ImageBackground } from 'react-native'

import Button from '../../components/Button'
import ScreenLayout from '../../components/ScreenLayout'
import backIcon from '../../assets/back.png'
import { RFValue } from 'react-native-responsive-fontsize'
import { capitalizeFirstLetter, colors } from '../../GlobalStyles'
import upload from '../../assets/photoCamera.png'
import profile from '../../assets/profile.png'
import wallpaper from '../../assets/wallpaper.png'
import {LinearGradient} from 'expo-linear-gradient';
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { launchImageLibrary } from 'react-native-image-picker'
import { webURL } from '../../services/BaseURL'
import MessageModal from '../../components/MessageModal'
import { ActivityIndicator } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAllSports, updateProfile, userDetail } from '../../services/signin'
import { useDispatch , useSelector } from 'react-redux';
import {setUserDetail ,fetchUser} from '../../redux/userSlice'
import moment from 'moment'
import AlertBox from '../../components/AlertBox'
import SportsModal from '../../components/SportsModal'


const EditProfile = ({navigation})=> {
    const reduxStore = useSelector(state => state?.userDetail.userDetail)

    const [tempUrl , setTempUrl] = useState(webURL)
    const [modalVisible , setModalVisible] = useState(false)
    const [message , setMessage] = useState('')
    const [disable ,setDisable] = useState(false)
    const [loading , setLoading] = useState(false)
    const [genderOpen , setGenderOpen] = useState(false)
    const [value , setValue]= useState(null)
    const [genderItems , setGenderItems] = useState([{label : "Male" , value : "male" }, {label : "Female" , value : "female"  }])
    const [user , setUser] = useState(reduxStore)
    const [DD , setDD] = useState(reduxStore.dob.dd)
    const [MM , setMM] = useState(reduxStore.dob.mm)
    const [YYYY , setYYYY] = useState(reduxStore.dob.yyyy)
    const [title , setTitle] = useState("Error")
    const [sports , setSports] =useState()
    const [selectedSport , setSelectedSport] = useState([])
    const [sportsModal , setSportsModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=> {
        getAllSports().then(res=> setSports(res.data.sports))
        setSelectedSport(user.sportsInterest)
},[])

    
    useEffect(()=>{
        var a = moment();
        var b = moment(`${MM}-${YYYY}`, 'MM-YYYY');
        var age = moment.duration(a.diff(b));
        setUser({...user , ["age"] : age.years()})
        setUser({...user , ["dob"] : {
            dd : DD ,
            mm : MM , 
            yyyy : YYYY
        }})
    }, [DD , MM , YYYY])

    const handleChange = (event, key)=> {
            setUser({...user , [key] : event })
    }

    const handleSave = ()=> {
        var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        setLoading(true)
        if(!regex.test(user.phone)){
            setModalVisible(true)
            setTitle("Error")
            setMessage("Please use the country code on number. +92xxxxxxx")
            setLoading(false)
            return
        }

        if (user.firstName.length < 3 || user.lastName.length < 3) {
            setModalVisible(true)
            setTitle("Error")
            setMessage("First or Last name should be atleast 3 characters")
            setLoading(false)
            return
        } 
        console.log(user)
        updateProfile(user)
        .then((response)=>{
            dispatch(fetchUser())
            setModalVisible(true)
         if (response.data.status){
            setTitle("Success")
            setMessage(response.data.message)
            setLoading(false)
         }else { 
            setTitle("Error")
            setMessage(response.data.message)
            setLoading(false)
         }
        })
        .catch((ex) =>{
            setLoading(false)
            console.log(ex)
        })
    }

    const handleProfile  = ()=> { 
        setDisable(true)
        launchImageLibrary({
            mediaType : "photo",
            includeBase64 : true,
            includeExtra : true,
            quality : 0.5
        } , (event) => {
            setDisable(false)
            if(!event.didCancel) {
                setTempUrl("")
                let image = event.assets[0].base64
                setUser({...user , ["profilePic"] : `data:image/png;base64,${image}`})
            }

        })
    }

    const  handleSelection = (item)=> {
        console.log(selectedSport)

        let array =  selectedSport.find(current => String(current._id) == String(item._id) )
        if (array){
          let data = selectedSport.filter(current => String(current._id) !== String(item._id) )
          return setSelectedSport(data)
        }
            setSelectedSport([...selectedSport  , item])
            setUser({...user , ["sportsInterest"] : [...selectedSport , item] })
      }
    
      const checkMultiple = (item)=> {
          if(selectedSport.length == 0) {
              return false
          }else{
            let data = selectedSport.find(element => String(element._id) == String(item._id))
            if (data){
                return true
            }else {
                return false
            }
        }
      }

    const onFocus = ()=> {
        // const pakistan = `${country[0]}${country[1]}`
        // if(user.phone.length < 4 ){
        //     if(pakistan == "PK"){
        //         handleChange('+92', "phone")         
        //        }else {
        //         handleChange('+92', "phone")
        //  }
        // }
        
    }

    return (
            <View
     
            style = {{height : "100%"}}>

                <View style ={styles.headerContainer}>
                <LinearGradient
            style = {{height : "100%", width : "100%" }}
            colors={[colors.dark  , colors.light ] }>
                <View style={{flexDirection : "row" , alignItems : "center"  , top : 10 }}>
                <TouchableOpacity
              onPress ={()=>navigation.navigate("HOME")}
              style = {styles.backButton}>
                   <Image 
                   source = {backIcon} style = {styles.backlogo} />
              </TouchableOpacity>
              
      
            <Text style = {styles.h2}>Edit Profile</Text> 
                </View>
         
            </LinearGradient> 
            </View>

            <ImageBackground 
            resizeMode = "cover"
            source  = {wallpaper}
            imageStyle = {{width : "100%" , height : "100%"}}
            style = {{height : "80%" ,  backgroundColor : "white" , paddingHorizontal : "5%"}}
            >
         <TouchableOpacity
         disabled = {disable}
         onPress ={handleProfile}
         style = {styles.circle}>
            <View style={{width : 50 , height : 50 , backgroundColor : "#999", borderRadius : 50, justifyContent :"center", alignItems : "center", position : 'absolute' , zIndex : 10 , alignSelf : "flex-end" , bottom : 10 , right : 2 }}>
                <Image
                source={upload}
                style={{width : "60%", height : "60%" , resizeMode : "contain" , tintColor : "white"}}
                />
            </View>
            <Image
            key = {new Date()}
            source = {user.profilePic == "" ? profile : {uri : `${tempUrl}${user.profilePic}`}}
            style = {{width : "90%" , height : "90%" , borderRadius : 100 }}
            />
    </TouchableOpacity>
    <View style={{ height :"72%" }}>
        <ScrollView style={{ paddingVertical : "2%"}}>
            <View style = {{marginTop: "3%"}}>
    <OutlinedTextField
        lineWidth = {1}
        tintColor = {colors.light}
        baseColor = "grey"
        textColor = "grey"
        onChangeText= {(event)=> handleChange(event , "firstName")}
        value = {user.firstName}
        label = "First Name"
        />
        </View>
        <View style = {{marginTop: "2%"}}>
            <OutlinedTextField
        lineWidth = {1}
        tintColor = {colors.light}
        baseColor = "grey"
        textColor = "grey"
        onChangeText= {(event)=> handleChange(event , "lastName")}
        value = {user.lastName}
        label = "Last Name"
        />  
        </View> 
        
        
        <View style = {{flexDirection : "row", justifyContent : "space-between",marginTop: "2%" }}>
                    <View style= {{width : "30%" ,}}>
                    <OutlinedTextField
                autoCapitalize = "none"
                tintColor = {colors.light}
                baseColor = "grey"
                textColor = "grey"
                onChangeText = {(event) => setDD(event)}
                label = {"DD"}
                value = {DD}
                />
                    </View>
              
                    <View style= {{width : "30%"}}>
                <OutlinedTextField
                autoCapitalize = "none"
                tintColor = {colors.light}
                baseColor = "grey"
                textColor = "grey"
                onChangeText = {(event) => setMM(event)}
                label = {"MM"}
                value = {MM}
                />
                </View>
                <View style= {{width : "30%"}}>
                <OutlinedTextField
                autoCapitalize = "none"
                tintColor = {colors.light}
                baseColor = "grey"
                textColor = "grey"
                onChangeText = {(event) => setYYYY(event)}
                
                label = {"YYYY"}
                value = {YYYY}

                />
                </View>
                </View> 
   
                     <View style = {styles.container}>    
               <DropDownPicker
               open = {genderOpen}
               setOpen = {setGenderOpen}
             placeholder= {capitalizeFirstLetter(user.gender)}
             items={genderItems}
             value={capitalizeFirstLetter(value)}
             setValue = {setValue}
             setItems = {setGenderItems}
             onChangeValue={(event)=> handleChange(event , "gender")}
             zIndex={3000}
             zIndexInverse={1000}
            textStyle ={{color: "grey"}}
             style = {{borderRadius:5 , borderColor : 'grey' , height : RFValue(50)}}

           /> 
           
             </View>


             <View style = {{marginTop: "2%"}}>
            <OutlinedTextField
        lineWidth = {1}
        tintColor = {colors.light}
        baseColor = "grey"
        textColor = "grey"
        keyboardType='phone-pad'
        value = {user.phone}
        onFocus = {()=>onFocus()}
        onChangeText= {(event)=> handleChange(event , "phone")}
        label = "Phone Number"
        />
        </View>
        <View style = {{marginTop: "2%"}}>
            <OutlinedTextField
        lineWidth = {1}
        tintColor = {colors.light}
        baseColor = "grey"
        textColor = "grey"
        label = "Sport Type"
        // onChangeText= {(event)=> handleChange(event , "address")}
        onFocus={()=> setSportsModal(true)}
        value = {selectedSport.map((item)=> item.name)}
        />
        </View>
        </ScrollView>
         </View>
     
            <TouchableOpacity
            style = {{
                width : "90%",
                alignSelf : "center",
                marginTop : "5%"
            }}
            onPress = {()=>handleSave()}
            disabled = {loading}
            >
                {
                    loading ? 
                    <ActivityIndicator size = {"small"} color = {colors.light} />
                    :
                    <View style = {{height : RFValue(45)}}>
                    <Button text ={"SAVE"} />
                    </View>
                }
            </TouchableOpacity>

            </ImageBackground> 

 <SportsModal 
    handleSelection = {handleSelection} checkMultiple = {checkMultiple}
      modalVisible={sportsModal} setModalVisible={setSportsModal} sports = {sports} />

            <AlertBox 
            alertBox={modalVisible}
            setAlertBox={setModalVisible} 
            title={title}
            message={message}
            />
            {/* <MessageModal modalVisible = {modalVisible} setModalVisible = {setModalVisible}
       message = {message}
       /> */}
            </View>

         
    )
}
const styles = StyleSheet.create({
    backButton :{ 
        paddingHorizontal : "4%" , paddingVertical :"2%",
        justifyContent : "center", alignItems : "center",
         top : "0.5%"
   },
   backlogo : {
    resizeMode : "center",
    width : RFValue(16), height : RFValue(16),

},
headerContainer : {
    width : "100%",
    flexDirection : "row",
    alignItems : "center",
    alignSelf : "center",
    height : "20%",

}, 
h2 : {
    marginLeft : "3%",
    top: "0.5%",
    fontSize : RFValue(16),
    color : "white" 
},
circle : {
    height : RFValue(130) , width : RFValue(130) ,
     borderRadius : 100 ,
     backgroundColor : "white",
     alignSelf : "center",
     marginTop : "-22%",
     alignItems : "center",
     justifyContent : "center",
     marginBottom : "7%",
       shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
},
container: {
    marginTop : "2%",
    marginBottom : "3%",
    flex: 1,
  },
inputBar : {
    backgroundColor : "white" ,
    height : RFValue(50),
    marginTop : "3%",
    borderColor : "grey",
    borderWidth : 0.5 ,
    borderRadius : 5
},
uploadButton : {
    height : RFValue(50),
    width : "100%",
    marginTop : "5%",
    borderWidth : 1,
    borderStyle : "dotted",
    borderRadius : 2,
    borderColor : colors.light,
    justifyContent : "center",
    alignItems : "center"
}

   
})

export default EditProfile