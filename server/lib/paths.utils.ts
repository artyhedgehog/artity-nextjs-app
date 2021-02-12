import path from 'path';

export enum Directory {
  SERVER = 'server',
  CONTENT = 'content',
  ENTITIES = 'entities',
}

export enum File {
  HOME_DESCRIPTION = 'home-description.md',
}

export const entitiesDirectory = path.join(
  process.cwd(),
  Directory.SERVER,
  Directory.CONTENT,
  Directory.ENTITIES,
);

export function getEntityId(fileName: string) {
  return fileName.replace(/\.md$/, '');
}

export function getEntityFullPathByFileName(fileName: string) {
  return path.join(entitiesDirectory, fileName);
}

export function getEntityFullPathById(id: string) {
  const fileName = `${ id }.md`;

  return getEntityFullPathByFileName(fileName);
}

export function getHomeFullPath() {
  return path.join(process.cwd(), Directory.SERVER, Directory.CONTENT, File.HOME_DESCRIPTION);
}

export function getEntityHref(id: string) {
  return [null, Directory.ENTITIES, id].join('/');
}
