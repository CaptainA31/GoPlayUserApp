import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const getAllTrain = ()=>{ 
    return axios.get(BaseURL + 'userApp/train')
}

export const getIndividualTrain = ()=>{ 
    return axios.get(BaseURL + 'userApp/train/individual')
}