import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchMyInvites = createAsyncThunk('getInvitedList/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(BaseURL + 'userApp/hostActivity/getInvitedList', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.gamesList;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const myGamesSlices = createSlice({
  name: "getInvitedList",
  initialState: {
    InviteList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyInvites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.InviteList = action.payload;
      })
      .addCase(fetchMyInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default myGamesSlices.reducer;
