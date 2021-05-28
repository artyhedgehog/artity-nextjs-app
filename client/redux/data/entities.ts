import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestEntitySearch } from '../../api/entities-api.service';
import { EntityStore } from '../../entities/EntityStore';

const initialState = new EntityStore();

export const searchEntities = createAsyncThunk('entities/search', async (query: string) => {
  return requestEntitySearch(query);
});

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchEntities.fulfilled, ((state, action) => {
      const { entities, searchQuery } = action.payload;

      return state.setSearchResults(searchQuery, entities);
    }));
  },
});

export default entitiesSlice.reducer;

