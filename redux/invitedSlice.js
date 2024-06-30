// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchMyInvites = createAsyncThunk('/getInvitedList' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const token = await AsyncStorage.getItem("token")  
//     const res = await axios.get(BaseURL + 'userApp/hostActivity/getInvitedList' , {
//         headers : {
//             Authorization : `Bearer ${token}`
//           }
//     })
//     return res.data.gamesList
//  }
//  catch(ex){
//     return ex
//  }
// })

// const myGamesSlices = createSlice({
//     name : "getInvitedList",
//     initialState : {
//       InviteList : []
//     },
//     extraReducers : {
//         [fetchMyInvites.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchMyInvites.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.InviteList = action.payload;
//          },
//          [fetchMyInvites.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default myGamesSlices.reducer