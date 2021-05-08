import indexBy from 'ramda/src/indexBy';
import pipe from 'ramda/src/pipe';
import mergeRight from 'ramda/src/mergeRight';
import set from 'ramda/src/set';
import lensProp from 'ramda/src/lensProp';

import { EntityId, EntityItem } from '../../common/entities.models';

type EntityMap = Record<EntityId, EntityItem>;

export class EntityStore {
  constructor(entities: EntityMap = {}, searchResults: Record<string, EntityId[]> = {}) {
    this.entities = entities;
    this.searchResults = searchResults;

    this.upsertEntitiesFromList = pipe(
        indexBy(this.itemToId),
        mergeRight(this.entities),
    );
  }

  readonly searchResults: Record<string, EntityId[]>;
  readonly entities: EntityMap;

  setSearchResults(query: string, entities: EntityItem[]): EntityStore {
    const nextEntities = this.upsertEntitiesFromList(entities);
    const nextSearchResults = this.addSearchResult(query, entities.map(this.itemToId));

    return new EntityStore(nextEntities, nextSearchResults);
  }

  private addSearchResult = (query: string, result: EntityId[]) => set(lensProp(query), result,
      this.searchResults);

  private itemToId = (entity: EntityItem): EntityId => entity.id;

  private readonly upsertEntitiesFromList: (entities: EntityItem[]) => EntityMap;
}
