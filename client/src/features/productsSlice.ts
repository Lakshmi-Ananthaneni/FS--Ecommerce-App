import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProducts, Products } from "types";
import axios from "axios";
//axios.defaults.withCredentials = true

const initialState: InitialStateProducts = {
  products: [],
  loading: true,
  error: "",
};

//async function for fetching products data
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/products`, {
      withCredentials: true,
    })
    return response.data
  } catch (error: any) {
    console.log(error.response.data.message)
  }
  /*const res = await fetch("http://localhost:4000/api/v1/products");
  const json = await res.json();
  return json;*/
});

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Products[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;

