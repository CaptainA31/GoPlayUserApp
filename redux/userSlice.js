import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../services/BaseURL";

export const fetchUser = createAsyncThunk('user/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(BaseURL + 'userApp/users/userDetail', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.userDetail;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetail: {
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
      profilePic: "",
      _id: "",
      name: "",
      email: "",
      phone: "",
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
