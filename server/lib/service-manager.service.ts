import { EntitiesDao } from './dao/entities.dao';
import { EntitiesFsDao } from './dao/entities.fs-dao';

export class ServiceManager {
  static readonly instance = new ServiceManager();

  readonly entitiesDao: EntitiesDao = new EntitiesFsDao()
}
