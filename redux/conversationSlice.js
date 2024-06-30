// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchConversation = createAsyncThunk('/conversationList' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const token = await AsyncStorage.getItem("token")  
//     const res = await axios.post(BaseURL + 'conversation/get' , 'data', {
//         headers : {
//             Authorization : `Bearer ${token}`
//           }
//     })
//     return res.data.conversation
//  }
//  catch(ex){
//     return ex
//  }
// })

// const conversationSlices = createSlice({
//     name : "conversationList",
//     initialState : {
//       conversationList : []
//     },
//     extraReducers : {
//         [fetchConversation.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchConversation.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.conversationList = action.payload;
//          },
//          [fetchConversation.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default conversationSlices.reducer