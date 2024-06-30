import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const transferFunds = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/wallet/transfer' , data , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }

  export const requestFunds = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/wallet/request' , data , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }

  export const acceptRequest = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/wallet/acceptRequest' , data , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }

  export const declineRequest = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/wallet/declineRequest' , data , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }

  export const myRequests = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.get(BaseURL + 'userApp/wallet/request' , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }

  export const getTransactions = async (data)=> {
    const token = await AsyncStorage.getItem("token")
    return axios.get(BaseURL + 'userApp/wallet' ,  {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
  }