import { ParsedUrlQuery } from 'querystring';

import { getFileNames } from './files.utils';
import { parseMarkdownFileMatter, parseMarkdownFile } from './markdown.utils';
import { getEntityFullPathByFileName, getEntityFullPathById, getEntityId, entitiesDirectory } from './paths.utils';
import { doesEntityMatchFilter, EntityFilter } from './filter.service';

export interface EntityListItemData {
  date: string
  title: string
  id: string
  [key: string]: any
}

export function getSortedEntitiesData(filter: EntityFilter = {}): EntityListItemData[] {
}

export interface EntityIdParams extends ParsedUrlQuery {
  id: string
}

interface AllEntitiesIdsItem {
  params: EntityIdParams
}

export function getAllEntitiesIds(): AllEntitiesIdsItem[] {
  const fileNames = getFileNames(entitiesDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export interface EntityData {
  [p: string]: any;

  id: string;
  contentHtml: string;
}

export async function getEntityData(id: string): Promise<EntityData> {
  const fullPath = getEntityFullPathById(id);
  const { matterResult, contentHtml } = await parseMarkdownFile(fullPath);

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
