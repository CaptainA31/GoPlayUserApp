import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const getAllOffers = ()=>{ 
    return axios.get(BaseURL + 'userApp/offers/getAllOffers')
}


export const getBanners = ()=>{ 
    return axios.get(BaseURL + 'userApp/banner')
}