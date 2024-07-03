import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { BaseURL } from "./BaseURL";


export const createConversation = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/create' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const createGroupConversation = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/createGroup' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const getAllConvo = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/get' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const getMyGroups = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/getMyGroups' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const getAllGroups = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/getAllGroups' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}


export const getOtherGroups = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/getOtherGroups' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}
export const joinGroup = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/joinGroup' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const kickMember = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/kickMember' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}



export const deleteGroups = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/deleteGroup' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}


export const blockUser = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/blockUser' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const leaveGroup = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/leaveGroup' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const unBlockUser = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/UnblockUser' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const deleteConversation = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'conversation/handleDelete' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}