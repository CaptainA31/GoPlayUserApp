import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchMyGames = createAsyncThunk('myGameList/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(BaseURL + 'userApp/hostActivity/myGames', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.myGames;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const myGamesSlices = createSlice({
  name: "myGameList",
  initialState: {
    myGamesList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyGames.fulfilled, (state, action) => {
        state.loading = false;
        state.myGamesList = action.payload;
      })
      .addCase(fetchMyGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default myGamesSlices.reducer;
