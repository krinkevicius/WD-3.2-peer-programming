import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const queryParams = req.query.id

      if (queryParams && typeof queryParams === 'string') {
        const ids = queryParams.split(',').map((id) => parseInt(id, 10))
        const movies = await messages.findByIds(ids)

        return movies
      }
      return messages.findAll()
    })
  )

  return router
}
