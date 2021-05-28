import { buildCrudRequestHandler, Query } from '../../../server/lib/api.helpers';
import { EntityItem } from '../../../common/entities.models';
import { EntitiesQueryParamKey } from '../../../common/entities-api.models';

async function onGet(query: Query): Promise<EntityItem[]> {
  const searchQuery = query[EntitiesQueryParamKey.SEARCH_QUERY]

}

async function onPost(model: EntityItem[]): Promise<void> {
  // TODO: implement entity creation
}

const handleEntitiesRequest = buildCrudRequestHandler<EntityItem[]>({
  onGet,
  onPost,
});

export default handleEntitiesRequest
