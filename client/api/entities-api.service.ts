import { EntityItem } from '../../common/entities.models';

export interface EntitySearchResponse {
  searchQuery: string
  entities: EntityItem[]
}

// @ts-ignore
export async function requestEntitySearch(searchQuery: string): Promise<EntitySearchResponse> {
  const params = { searchQuery };
  const queryParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
  const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : ''
  const url = '/api/chat/messages' + queryString

  const response = await fetch(url)
  const responseBody = await response.json();

  return {
    searchQuery,
    entities: responseBody.entities as EntityItem[],
  }
}

// export async function postMessages(data: ChatMessageData[]): Promise<void> {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   }
//
//   await fetch('/api/chat/messages', requestOptions)
// }
//
// export async function getMessages(params: MessagesFetchParams): Promise<Record<'messages', ChatMessageModel[]>> {
// }
