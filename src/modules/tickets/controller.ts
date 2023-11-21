import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const tickets = buildRespository(db)
  const router = Router()

  router.route('/').get(jsonRoute(async () => tickets.findAll()))

  return router
}
