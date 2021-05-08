import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { searchEntities } from '../data/entities';

export interface SearchState {
  query: string
}

const initialState: SearchState = {
  query: ''
};

export const setQuery = createAsyncThunk('search/setQuery', async (query: string, thunkAPI) => {
  thunkAPI.dispatch(searchEntities(query))
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setQuery.pending, (state: SearchState, action: PayloadAction<string>): SearchState => ({
      ...state,
      query: action.payload,
    }))
  }
})

export default searchSlice.reducer;
