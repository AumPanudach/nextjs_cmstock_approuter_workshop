import { ProductData } from "@/models/product.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serverService from "@/services/serverService";
import { RootState } from "../store";
import reducer from "./userSlice";
interface ProductState {
  products: ProductData[];
}

const initialState: ProductState = {
  products: [],
};

export const getProduct = createAsyncThunk(
  "/product/getProduct",
  async (keyword?: string | undefined) => {
    const response = await serverService.getProducts(keyword);
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "/product/addProduct",
  async (values: ProductData) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("price", String(values.price));
    data.append("stock", String(values.stock));
    if (values.file) {
      data.append("image", values.file);
    }
    const response = await serverService.addProduct(data);
    return response;
  }
);

export const editProduct = createAsyncThunk(
  "product/addProduct",
  async (values: ProductData) => {
    let data = new FormData();
    data.append("id", String(values.id));
    data.append("name", values.name);
    data.append("price", String(values.price));
    data.append("stock", String(values.stock));

    if (values.file) {
      data.append("image", values.file);
    }
    const response = serverService.editProduct(data);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    await serverService.deleteProduct(id);
  }
);

const productSlices = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlices.reducer;
export const productSelector = (state: RootState) => state.productReducer;
