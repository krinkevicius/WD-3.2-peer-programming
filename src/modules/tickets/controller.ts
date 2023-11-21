import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import BadRequest from '@/utils/errors/BadRequest'

export default (db: Database) => {
  const tickets = buildRespository(db)
  const router = Router()

  router
    .route('/')
    .get(jsonRoute(async () => tickets.findAll()))
    .post(
      jsonRoute(async (req) => {
        const ticketToAdd = req.body
        const newTicket = await tickets.create(ticketToAdd)
        if (!newTicket) throw new BadRequest('Not enough tickets!')
        return newTicket
      }, 201)
    )

  return router
}
