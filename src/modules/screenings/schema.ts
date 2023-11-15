import { z } from 'zod'

const schema = z.object({
  id: z.number().positive().int(),
  timestamp: z.string(),
  totalTickets: z.number().positive().int(),
  ticketsLeft: z.number().positive().int(),
  movieId: z.number().positive().int(),
})

export const parse = (record: unknown) => schema.parse(record)
