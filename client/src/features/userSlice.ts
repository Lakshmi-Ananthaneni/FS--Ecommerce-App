import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateUser, UserProfile } from "../types";
axios.defaults.withCredentials = true

const initialState: InitialStateUser = {
  error: "",
  loading: true,
  isLoggedIn: false,
  isAdmin: 0,
  user: {_id: "", firstname: "",lastname: "", email: "", phone: "" },
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(
    "http://localhost:4000/api/v1/users/profile",
    {
      withCredentials: true,
    }
  );
  return response.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
    setAdmin: (state) => {
      state.isAdmin = 1;
    },
    removeAdmin: (state) => {
      state.isAdmin = 0;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as UserProfile;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setLoggedIn, setUser, setLoggedOut, setAdmin, removeAdmin } =
  userSlice.actions;
export default userSlice.reducer;