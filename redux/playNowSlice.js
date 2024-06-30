// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchPlayNow = createAsyncThunk('/playNow' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const token = await AsyncStorage.getItem("token")  
//     const res = await axios.get(BaseURL + 'userApp/hostActivity/playNow' , {
//         headers : {
//             Authorization : `Bearer ${token}`
//           }
//     })
//     return res.data.myGames
//  }
//  catch(ex){
//     return ex
//  }
// })

// const myGamesSlices = createSlice({
//     name : "playNow",
//     initialState : {
//       myGamesList : []
//     },
//     extraReducers : {
//         [fetchPlayNow.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchPlayNow.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.myGamesList = action.payload;
//          },
//          [fetchPlayNow.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default myGamesSlices.reducer