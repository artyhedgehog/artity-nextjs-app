import path from 'path';

export enum Directory {
  SERVER = 'server',
  CONTENT = 'content',
  ENTITIES = 'entities',
  VIEWS = 'views',
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

const buildRelativeHref = (directories: string[]): string => directories.join('/');

export function getEntityHref(id: string) {
  return buildRelativeHref([null, Directory.ENTITIES, id]);
}

export function getProjectsViewHref() {
  return buildRelativeHref([null, Directory.VIEWS]);
}
