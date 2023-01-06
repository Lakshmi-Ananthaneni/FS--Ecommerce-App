import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {  CategoryType, InitialStateCategories, Products } from "types";
import axios from "axios";

const initialState: InitialStateCategories = {
  categories: {token:"", name:""},
  loading: true,
    error: "",
  };

//async function for fetching products data
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/categories`, {
      withCredentials: true,
    })
    return response.data
    
  } catch (error: any) {
    console.log(error.response.data.message)
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryType>) => {
          state.loading = false;
          state.categories= action.payload;
          state.error = "";
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.categories = {} as CategoryType;
        state.error = action.error.message
         || "Something went wrong";
      });
  },
});

export default categoriesSlice.reducer;

