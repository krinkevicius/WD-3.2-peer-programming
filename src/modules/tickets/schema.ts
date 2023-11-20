import { z } from 'zod'

const schema = z.object({
  id: z.number().positive().int(),
  ticketNumber: z.number().positive().int(),
  screeningId: z.number().positive().int(),
})

export const parse = (record: unknown) => schema.parse(record)
