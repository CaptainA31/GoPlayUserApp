import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const getAllMyGames = async()=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.get(BaseURL + 'userApp/hostActivity/myPastGames' , {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}