import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchConversation = createAsyncThunk('conversationList/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(BaseURL + 'conversation/get', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.conversation;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const conversationSlices = createSlice({
  name: "conversationList",
  initialState: {
    conversationList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.conversationList = action.payload;
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default conversationSlices.reducer;
