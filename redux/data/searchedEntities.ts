import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EntityData {

}

export interface SearchedEntitiesState {
  [query: string]: EntityData
}

const initialState: SearchedEntitiesState = {};

export const searchEntities = createAsyncThunk('entities/search', async (query: string) => {
  // TODO: request entities filtered by search
  // const response = await fetch('api/')
  return []
});

const searchedEntitiesSlice = createSlice({
  name: 'searchedEntities',
  initialState,
  reducers: {
    setQueryData(
        state: SearchedEntitiesState,
        action: PayloadAction<{ query: string, data: EntityData }>): SearchedEntitiesState {
      const { query, data } = action.payload || {};

      return {
        ...state,
        [query]: data,
      };
    },
  },
});

export const {
  setQueryData,
} = searchedEntitiesSlice.actions;

export default searchedEntitiesSlice.reducer;

