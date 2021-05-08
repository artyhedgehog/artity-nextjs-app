import { EntityItem } from '../../common/entities.models';

export interface EntitySearchResponse {
  query: string
  entities: EntityItem[]
}

// @ts-ignore
export async function requestEntitySearch(query: string): Promise<EntitySearchResponse> {
  // TODO: implement search request
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
//   const queryParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
//   const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : ''
//   const url = '/api/chat/messages' + queryString
//
//   const response = await fetch(url)
//
//   return response.json()
// }
