import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "./BaseURL";

export const Login = (data)=> { 
  // console.log("Signin services Data: ", data)
  return axios.post(BaseURL +"userApp/users/login", data)
}

export const Register = (data)=> { 
  const res = axios.post(BaseURL +"userApp/users/register", data );
  return res;
}

export const isPhoneExist = (data)=> { 
  return axios.post(BaseURL +"userApp/users/isPhoneExist", data)
}

export const isEmailExist = (data)=> { 
  return axios.post(BaseURL +"userApp/users/isEmailExist", data)
}

export const updateProfile = async (data)=> {
  const token = await AsyncStorage.getItem("token")
  return axios.post(BaseURL + 'userApp/users/updateProfile' , data , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const UpdateSports = (data ,token)=> { 
  return axios.post(BaseURL +"userApp/users/updateSports", data)
}


export const getAllUser = async()=>{ 
  const token = await AsyncStorage.getItem("token")
  return axios.get(BaseURL + 'userApp/users/getAllUsers', {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const getGlobalUsers = async()=>{ 
  const token = await AsyncStorage.getItem("token")
  return axios.get(BaseURL + 'userApp/users/getGlobalUsers', {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}
export const verifyNumber = async (data)=> {
  const token = await AsyncStorage.getItem("token")
  return axios.post(BaseURL + 'userApp/users/verifyNumber' , data , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}
export const forgetPassword = async (data)=> {
  const token = await AsyncStorage.getItem("token")
  return axios.post(BaseURL + 'userApp/users/forgetPass' , data , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const changePassword = async (data)=> {
  const token = await AsyncStorage.getItem("token")
  return axios.post(BaseURL + 'userApp/users/changePass' , data , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const updateToken = async (data)=> {
  const token = await AsyncStorage.getItem("token")
  return axios.post(BaseURL + 'userApp/users/updateToken' , data , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const getAllSports = ()=>{ 
    return axios.get(BaseURL + 'sports')
}

export const getAllVenueFacilities = ()=>{ 
  return axios.get(BaseURL + 'venueFacilities')
}

export const verifyToken = async ()=> {
  const token = await AsyncStorage.getItem("token")
  return axios.get(BaseURL + 'userApp/users/verifyToken' , {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
}

export const userDetail = {
    "firstName": "",
    "lastName": "",
    "gender": "",
    "companyName": "",
    "address": "",
    "profilePic": "",
      "_id": "",
      "name": "l",
      "email": "",
      "phone": "",
      "password": "",
      "points" : 0,
      "age" : 0
  
  
  }

  export const venueFacilityData = ["Parking", "Toilets",
"Shower","Internet", "Refreshment" , "Lockers" , "Change rooms" 
, "Equipment Provided" , "Disable Access"]