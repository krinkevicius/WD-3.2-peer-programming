import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')
const selectAllTickets = selectAllFor(db, 'tickets')

afterAll(() => db.destroy())

beforeAll(async () => {
  await createMovies({
    id: 133093,
    title: 'The Matrix',
    year: 1999,
  })
})

beforeEach(() => {
  db.deleteFrom('tickets').execute()
})

describe('create', () => {
  it('should create a new ticket booking for movie that has enough tickets left', async () => {
    await createScreenings({
      timestamp: '2020-01-01T00:00:00Z',
      totalTickets: 250,
      movieId: 133093,
    })
    const newTicket = {
      id: 1,
      ticketNumber: 1,
      screeningId: 1,
    }
    await repository.create(newTicket)

    const allTickets = await selectAllTickets()
    expect(allTickets).toHaveLength(1)
  })

  it('should return null if there is not enough tickets in the screening', async () => {
    await db
      .updateTable('screenings')
      .set({ ticketsLeft: 1 })
      .where('id', '=', 1)
      .execute()

    const newTicket = {
      id: 1,
      ticketNumber: 5,
      screeningId: 1,
    }

    const newBooking = await repository.create(newTicket)
    expect(newBooking).toBeNull()
    const allTickets = await selectAllTickets()
    expect(allTickets).toHaveLength(0)
  })
})
