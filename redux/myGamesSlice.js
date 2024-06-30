// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchMyGames = createAsyncThunk('/myGameList' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const token = await AsyncStorage.getItem("token")  
//     const res = await axios.get(BaseURL + 'userApp/hostActivity/myGames' , {
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
//     name : "myGameList",
//     initialState : {
//       myGamesList : []
//     },
//     extraReducers : {
//         [fetchMyGames.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchMyGames.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.myGamesList = action.payload;
//          },
//          [fetchMyGames.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default myGamesSlices.reducer