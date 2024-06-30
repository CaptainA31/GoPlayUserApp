// import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BaseURL } from "../services/BaseURL";

// export const fetchFacility = createAsyncThunk('/facilityList' ,  async(payload , {rejectWithValue , getState , dispatch})=> {
//  try{
//     const res = await axios.get(BaseURL + 'facility/getAll')
//     return res.data
//  }
//  catch(ex){
//     return ex
//  }
// })

// const facilitySlices = createSlice({
//     name : "facilityList",
//     initialState : {
//       facilityList : {
//          facilities : []
//       }
//     },
//     extraReducers : {
//         [fetchFacility.pending] : (state , action)=> {
//             state.loading  = true 
//         },
//         [fetchFacility.fulfilled] : (state , action)=> {
//             state.loading = false;
//             state.facilityList = action.payload;
//          },
//          [fetchFacility.rejected] : (state , action)=> {
//             state.loading = false;
//             state.error = action.payload;
//          },
//     }
// })

// export default facilitySlices.reducer