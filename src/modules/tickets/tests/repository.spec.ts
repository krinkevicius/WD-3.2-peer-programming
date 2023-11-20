import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')
const createTickets = createFor(db, 'tickets')
const selectAllTickets = selectAllFor(db, 'tickets')

afterAll(() => db.destroy())

beforeAll(async () => {
  await createMovies({
    id: 133093,
    title: 'The Matrix',
    year: 1999,
  })
  await createScreenings([
    {
      timestamp: '2023-11-20T15:45:00Z',
      totalTickets: 250,
      movieId: 133093,
    },
    {
      timestamp: '2023-11-20T19:10:00Z',
      totalTickets: 250,
      movieId: 133093,
    },
  ])
})

beforeEach(() => {
  db.deleteFrom('tickets').execute()
})

describe('create', () => {
  it('should create a new ticket booking for movie that has enough tickets left', async () => {
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
      .where('id', '=', 2)
      .execute()

    const newTicket = {
      id: 1,
      ticketNumber: 4,
      screeningId: 2,
    }

    const newBooking = await repository.create(newTicket)
    expect(newBooking).toBeNull()
    const allTickets = await selectAllTickets()
    expect(allTickets).toHaveLength(0)
  })
})

describe('findAll', () => {
  it('should find all ticket bookings', async () => {
    await createTickets([
      {
        id: 1,
        ticketNumber: 4,
        screeningId: 1,
      },
      {
        id: 2,
        ticketNumber: 1,
        screeningId: 2,
      },
    ])
    const foundtickets = await repository.findAll()

    expect(foundtickets).toHaveLength(2)
    expect(foundtickets[0].ticketNumber).toEqual(4)
    expect(foundtickets[1].ticketNumber).toEqual(1)
  })
})
