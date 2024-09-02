import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const res = await axios(`${BASE_URL}/categories`);
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    isLoader: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoader = false;
    });
    builder.addCase(getCategories.pending, (state, _) => {
      state.isLoader = true;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoader = false;
      console.log('false');
    });
  },
});

export default categoriesSlice.reducer;
