import { combineReducers } from 'redux';

import searchedEntities from './entities';
import { EntityStore } from '../../entities/EntityStore';

export interface DataState {
  entities: EntityStore
}

export default combineReducers<DataState>({
  entities: searchedEntities,
});
