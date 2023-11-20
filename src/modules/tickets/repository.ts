import type { Insertable } from 'kysely'
import type { Database, Tickets } from '@/database'

const TABLE_NAME = 'tickets'
type TicketWithoutId = Omit<Tickets, 'id'>
type TicketsInsert = Insertable<TicketWithoutId>

export default (db: Database) => ({
  create: async (ticketToBook: TicketsInsert) => {
    const { ticketNumber, screeningId } = ticketToBook
    const availableTickets = await db
      .selectFrom('screenings')
      .where('id', '=', screeningId)
      .select('screenings.ticketsLeft')
      .executeTakeFirst()
    if (
      availableTickets &&
      availableTickets.ticketsLeft &&
      ticketNumber <= availableTickets.ticketsLeft
    ) {
      return db
        .insertInto(TABLE_NAME)
        .values(ticketToBook)
        .returningAll()
        .executeTakeFirst()
    }
    return null
  },
  findAll: () => db.selectFrom(TABLE_NAME).selectAll().execute(),
})
