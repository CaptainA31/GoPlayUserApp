import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchFacility = createAsyncThunk('facilityList/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(BaseURL + 'facility/getAll');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const facilitySlices = createSlice({
  name: "facilityList",
  initialState: {
    facilities: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacility.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacility.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(fetchFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default facilitySlices.reducer;
