import { NextApiRequest, NextApiResponse } from 'next'
import { HttpMethod, HttpStatusCode } from '../../common/models/http.models';

export type Query = {
  [key: string]: string | string[];
}

export interface CrudRequestHandlers<M> {
  onGet?: (query: Query) => Promise<M>
  onPost?: (model: M) => Promise<void>
}

function sendMethodNotAllowed(res: NextApiResponse): void {
  res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end()
}

export async function processCrudRequest<M>(
  req: NextApiRequest,
  res: NextApiResponse<M | void>,
  handlers: CrudRequestHandlers<M>
): Promise<void> {
  switch (req.method) {
    case HttpMethod.GET:
      if (!handlers.onGet) {
        sendMethodNotAllowed(res)
      } else {
        const result = await handlers.onGet(req.query)

        res.json(result as M)
      }

      break

    case HttpMethod.POST:
      if (!handlers.onPost) {
        sendMethodNotAllowed(res)
      } else {
        await handlers.onPost(req.body as M)

        res.status(HttpStatusCode.CREATED).end()
      }

      break

    default:
      sendMethodNotAllowed(res)
  }
}
