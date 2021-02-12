import whereEq from 'ramda/src/whereEq';
import { EntityListItemData } from './entities.service';

export interface EntityFilter {
  [name: string]: any;
}

type EntityFilterFunction = (data: EntityListItemData, ..._: any[]) => data is EntityListItemData;

export const doesEntityMatchFilter = (filter: EntityFilter): EntityFilterFunction => whereEq<EntityFilter>(filter) as EntityFilterFunction;

