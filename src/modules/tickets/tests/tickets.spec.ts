import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)
const createTickets = createFor(db, 'tickets')
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')

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

afterAll(() => db.destroy())

describe('GET', () => {
  it('should return all ticket bookings', async () => {
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
    const { body } = await supertest(app).get('/tickets').expect(200)
    expect(body).toHaveLength(2)
    expect(body[0].ticketNumber).toEqual(4)
    expect(body[1].ticketNumber).toEqual(1)
  })

  it('should return empty list if there are no bookings', async () => {
    const { body } = await supertest(app).get('/tickets').expect(200)
    expect(body).toHaveLength(0)
  })
})
