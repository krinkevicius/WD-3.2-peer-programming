import createTestDatabase from '@tests/utils/createTestDatabase'
import supertest from 'supertest'
import { createFor, selectAllFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)

const createScreenings = createFor(db, 'screenings')
const createMovies = createFor(db, 'movies')
const selectScreenings = selectAllFor(db, 'screenings')

beforeAll(async () => {
  await createMovies({
    id: 133093,
    title: 'The Matrix',
    year: 1999,
  })
})

beforeEach(() => {
  db.deleteFrom('screenings').execute()
})

afterAll(() => db.destroy())

describe('GET', () => {
  it('should return a list of screenings', async () => {
    await createScreenings([
      {
        timestamp: '2020-01-01T00:00:00Z',
        totalTickets: 250,
        movieId: 133093,
      },
    ])
    const { body } = await supertest(app).get('/screenings').expect(200)

    expect(body).toEqual([
      {
        id: 133093,
        movieId: 133093,
        ticketsLeft: 250,
        timestamp: '2020-01-01T00:00:00Z',
        title: 'The Matrix',
        totalTickets: 250,
        year: 1999,
      },
    ])
    expect(selectScreenings).toHaveLength(1)
  })

  it('should return empty list if there are no screenings', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)
    expect(body).toHaveLength(0)
    const screenings = await selectScreenings()
    expect(screenings).toHaveLength(0)
  })
})
