import { combineReducers } from 'redux';

import searchedEntities, { SearchedEntitiesState } from './searchedEntities';

export interface DataState {
  searchedEntities: SearchedEntitiesState
}

export default combineReducers<DataState>({
  searchedEntities,
});
