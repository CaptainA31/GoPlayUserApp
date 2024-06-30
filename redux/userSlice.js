// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //     detail : {
// //         "firstName": "",
// //         "lastName": "",
// //         "gender": "",
// //         "address": "",
// //         "profilePic": "",
// //           "_id": "",
// //           "name": "",
// //           "email": "",
// //           "phone": "",
// //     }
// // }
// // export const userSlices = createSlice({
// //     name  : "user",
// //     initialState : initialState , 
// //     reducers : {
// //         setUserDetail : (state , action)=> {
// //             state.detail= action.payload
// //         },

// //     }
// // })

// // export const {setUserDetail} = userSlices.actions;
// // export default userSlices.reducer;

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchUser = createAsyncThunk('/userList' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const token = await AsyncStorage.getItem("token")

//     const res = await axios.get(BaseURL + 'userApp/users/userDetail' , {
//         headers : {
//             Authorization : `Bearer ${token}`
//         }
//     })
//     return res.data.userDetail
//  }
//  catch(ex){
//     return ex
//  }
// })

// const userSlices = createSlice({
//     name : "userList",
//     initialState : {
//       userDetail : {       
//          "firstName": "",
//          "lastName": "",
//          "gender": "",
//          "address": "",
//          "profilePic": "",
//            "_id": "",
//            "name": "",
//            "email": "",
//            "phone": "",   
//       }   
//     },
//     extraReducers : {
//         [fetchUser.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchUser.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.userDetail = action.payload;
//          },
//          [fetchUser.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default userSlices.reducer