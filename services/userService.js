import AsyncStorage from '@react-native-async-storage/async-storage'
import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { BaseURL } from './BaseURL'


const userDetail = createApi({
    reducerPath : "userDetail",
    baseQuery : fetchBaseQuery({
        baseUrl : BaseURL
    }),
    endpoints : (builder)=> ({
        getUserDetail : builder.query({
            query : ()=> "userDetail",

        })
    })
})



export const getUserDetail = async()=> {
    const token = await AsyncStorage.getItem("token")
    return axios.get(BaseURL + 'userApp/users/userDetail' , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
  }