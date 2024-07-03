import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Header from '../../components/Header'
import MyTabBar from '../../components/MyTabBar'
import calendar from '../../assets/calendar.png'
import clock from '../../assets/clock.png'
import { colors, screen } from '../../GlobalStyles'
import wallpaper from '../../assets/wallpaper.png'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUser } from '../../redux/userSlice'
import { useFocusEffect } from '@react-navigation/core'
import { getTransactions } from '../../services/wallet'
import moment from 'moment'
import AlertBox from '../../components/AlertBox'

const Wallet = ({navigation}) => {
    // const userDetail = useSelector(state => state?.userDetail.userDetail)
    // const dispatch = useDispatch()
    const [transactions, setTransactions] = useState([])
    const [message, setMessage] = useState('')
    const [alertBox, setAlertBox] = useState(false)
    const [title, setTitle] = useState("")

    const userDetail = {
        _id: '123456',
        wallet: 5000,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Main St, Anytown, USA'
    }

    // useFocusEffect(
    //     React.useCallback(() => {  
    //         navigation.navigate("HOME")
    //         setTitle("Not Available")
    //         setAlertBox(true)
    //         setMessage("This feature has not been enabled in your region")
        
    //         // dispatch(fetchUser())
    //         getTransactions().then((res)=> {
    //            setTransactions(res.data.transactions)
    //         })
    //       return () => null
    //     }, [navigation])
    //   )
    
    const handleType = (item)=> { 
        if (item.reciever?._id == userDetail._id){
            return "Credit"
        } else {
            return "Debit"
        }
    }

    return (
        <ImageBackground
        source={wallpaper}
        style={screen}>
            <Header
            heading={"Wallet"}
            onBack={()=> navigation.pop()}
            />

            <AlertBox 
            alertBox={alertBox}
            setAlertBox={setAlertBox} 
            title={title}
            message={message}
            />

            <View style={styles.bottomContainer}>
                <View style={styles.walletContainer}>
                    <Text style={{color: colors.dark}}>Your Balance</Text>
                    <Text style={styles.price}>PKR {userDetail.wallet}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-around", height: "5%", marginTop: "5%"}}>
                    <View style={styles.button}>
                        <Text style={{color: colors.light}}>Recharge Wallet</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate('transferMoney')}
                    style={styles.button}>
                        <Text style={{color: colors.light}}>Transfer Money</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: "7%"}}>
                    <Text style={{color: "black"}}>RECENT TRANSACTIONS:</Text>
                </View>
                {
                    transactions.length > 0 ?
                    <FlatList 
                    data={transactions}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                    renderItem={({item})=> { 
                        return (
                        <View style={styles.container}>
                            <View style={styles.typeContainer}>
                                <Text style={{color: "white", paddingHorizontal: "2%", paddingVertical: "1%"}}>{handleType(item)}</Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={{color: colors.light, fontWeight: "bold"}}>REF:GOPLAY {item.trasactionID}</Text>
                                <Text style={{color: "black", fontWeight: 'bold'}}>PKR {item.amount}</Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text>{item.reason}</Text>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View style={{height: 15, width:15, marginRight: 5 }}>
                                        <Image
                                        source={calendar} 
                                        style={{width: "100%", height: "100%", resizeMode: "contain"}}
                                        />
                                    </View>
                                    <Text>{moment.utc(item.createdAt).format('DD-MMM-YYYY')}</Text>
                                    <Text> | </Text>
                                    <View style={{height: 15, width:15, marginRight: 5 }}>
                                        <Image
                                        source={clock} 
                                        style={{width: "100%", height: "100%", resizeMode: "contain"}}
                                        />
                                    </View>
                                    <Text>{moment(item.createdAt).format('hh:mm A')}</Text>
                                </View>
                            </View>
                            <Text style={{color: "black" }}>Sender: {item.sender.firstName}</Text>
                        </View>    
                        )
                    }}
                    />
                    :
                    <Text style={{alignSelf: "center", marginTop: "5%", color: colors.light}}>No Transaction(s) found!</Text>
                }
            </View>
            <View style={{height: "8%", backgroundColor: "yellow"}}>
                <MyTabBar currentTab={"WALLET"} navigation={navigation} />
            </View>
        </ImageBackground>
    )
}

export default Wallet

const styles = StyleSheet.create({
    bottomContainer: {
        height: "82%",
        paddingVertical: "5%",
        paddingHorizontal: "3%",
        backgroundColor: "white"
    },
    walletContainer: { 
        backgroundColor: "#ffcbfb",
        width: "97%",
        alignSelf: "center",
        height: "20%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    price: {
        fontSize: RFValue(35),
        fontWeight: "bold",
        color: "#070075"
    },
    button: {
        borderColor: colors.light,
        height: "100%",
        width: "44%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: RFValue(5)
    },
    container: {
        height: 90, 
        width: "100%",
        borderColor: colors.light,
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 5,
        paddingHorizontal: "5%",
        justifyContent: "center"
    },
    typeContainer: {
        backgroundColor: colors.light,
        position: "absolute",
        alignSelf: "flex-end",
        borderRadius: 5,
        top: "-22%", 
        right: "5%"
    }
})
