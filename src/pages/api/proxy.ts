import { NextApiRequest, NextApiResponse } from 'next'
import request from 'request'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = { ...req.headers }
  delete headers.host
  delete headers.connection

  request
    .post({
      uri: req.query.url as string,
      body: JSON.stringify(req.body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    .pipe(res)
}
