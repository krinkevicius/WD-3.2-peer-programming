import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const screenings = buildRespository(db)
  const router = Router()

  router
    .route('/')
    .get(jsonRoute(async () => screenings.findAll()))
    .post(
      jsonRoute(async (req) => {
        const screeningToAdd = req.body
        return screenings.create(screeningToAdd)
      }, 201)
    )

  return router
}
