import { EntityListItemData } from '../entities.service';

export interface EntitiesDao {
  getSortedEntities(): EntityListItemData[];
}
