import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchPlayNow = createAsyncThunk('playNow/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(BaseURL + 'userApp/hostActivity/playNow', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.myGames;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const playNowSlice = createSlice({
  name: "playNow",
  initialState: {
    myGamesList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayNow.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayNow.fulfilled, (state, action) => {
        state.loading = false;
        state.myGamesList = action.payload;
      })
      .addCase(fetchPlayNow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default playNowSlice.reducer;
