import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { BaseURL } from "./BaseURL";

export const createHostActivity = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/create' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const deleteHostActivity = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/delete' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const deleteBookActivity = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/cancelBookingActivity' , data, {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const getHostActivity = async()=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.get(BaseURL + 'userApp/hostActivity/myGames' , {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const joinGame = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/joinGame' , data,  {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const joinBookingGame = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/joinBookingGame' , data,  {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const leaveGame = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/leaveGame' , data,  {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}
export const leaveBookingGame = async(data)=>{ 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/hostActivity/leaveBookingGame' , data,  {
        headers : {
            Authorization : `Bearer ${token}`
          }
    })
}

export const getSlotsByDate = async (data) => { 
    const token = await AsyncStorage.getItem("token")
    return axios.post(BaseURL + 'userApp/slots/getByDate' , data , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const calculateDuration = (start , to)=> {
    var startTime = moment.utc(start, 'hh:mm A');
    var endTime = moment.utc(to, 'hh:mm A');
    
    // calculate total duration
    var duration = moment.duration(endTime.diff(startTime));
    
    // duration in hours
    var hours = parseInt(duration.asHours());
    
    // duration in minutes
    var minutes = parseInt(duration.asMinutes())%60;
    if (minutes == 0) {
    var text = `${Math.abs(hours)} Hour`
    }else {
        var text = `${hours} Hour and ${minutes} mins`
    }
    return text
}


export const calculateBookingDuration = (start , to)=> {
    var startTime = moment(start);
    var endTime = moment(to);
    
    // calculate total duration
    var duration = moment.duration(endTime.diff(startTime));
    
    // duration in hours
    var hours = parseInt(duration.asHours());
    
    // duration in minutes
    var minutes = parseInt(duration.asMinutes())%60;
    if (minutes == 0) {
    var text = `${hours} Hour`
    }else {
        var text = `${hours} Hour and ${minutes} mins`
    }
    return text
}