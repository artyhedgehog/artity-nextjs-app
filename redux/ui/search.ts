import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  query: string
}

const initialState: SearchState = {
  query: ''
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state: SearchState, action: PayloadAction<string>): SearchState {
      return {
        ...state,
        query: action.payload,
      };
    }
  }
})

export const {
  setQuery
} = searchSlice.actions;

export default searchSlice.reducer;
