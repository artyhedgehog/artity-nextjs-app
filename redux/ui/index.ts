import { combineReducers } from 'redux';

import search, { SearchState } from './search';

export interface UiState {
  search: SearchState
}

export default combineReducers<UiState>({
  search,
});
