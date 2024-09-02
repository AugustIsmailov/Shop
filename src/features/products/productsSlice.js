import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const res = await axios(`${BASE_URL}/products`);
    return res.data;
  }
);



const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoader: false,
  },
  reducers: {
    filteredByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },

    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoader = false;
    });
    builder.addCase(getProducts.pending, (state, _) => {
      state.isLoader = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoader = false;
      console.log('false');
    });
  },
});

export const { filteredByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
