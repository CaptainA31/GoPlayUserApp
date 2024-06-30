import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const getAllFacilities = ()=>{ 
    
    return axios.get(BaseURL + 'facility/getAll')
}

export const createBookActivity = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/bookActivity/create' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const createBooking = async(data)=> { 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'booking/create' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}