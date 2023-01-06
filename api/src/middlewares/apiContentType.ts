import { Request, Response, NextFunction } from 'express'

import { BadRequestError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  if (
    (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') &&
    !req.is(['application/json', 'multipart/form-encode'])
  ) {
    next(new BadRequestError('Request body must be of type json or multipart/form-data'))
  } else {
    next()
  }
}
