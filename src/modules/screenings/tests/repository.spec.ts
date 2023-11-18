import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')
const selectAllScreenings = selectAllFor(db, 'screenings')

beforeAll(async () => {
  await createMovies({
    id: 133093,
    title: 'The Matrix',
    year: 1999,
  })
})

beforeEach(() => {
  db.deleteFrom('screenings').execute()
  //   db.deleteFrom('movies').execute()
})

afterAll(() => db.destroy())

describe('create', () => {
  it('should create a new screening', async () => {
    const newScreening = await repository.create({
      timestamp: '2020-01-01T00:00:00Z',
      totalTickets: 250,
      movieId: 133093,
    })
    expect(newScreening).toEqual(newScreening)

    const allScreenings = await selectAllScreenings()
    expect(allScreenings).toHaveLength(1)
  })
})

describe('findAll', () => {
  it('should find all screenings', async () => {
    await createScreenings([
      {
        timestamp: '2020-01-01T00:00:00Z',
        totalTickets: 250,
        movieId: 133093,
      },
      {
        timestamp: '2020-01-01T12:00:00Z',
        totalTickets: 250,
        movieId: 133093,
      },
    ])
    const foundScreenings = await repository.findAll()
    expect(foundScreenings).toHaveLength(2)
    expect(foundScreenings[0]).toEqual({
      id: expect.any(Number),
      timestamp: '2020-01-01T00:00:00Z',
      totalTickets: 250,
      ticketsLeft: 250,
      movieId: 133093,
      title: 'The Matrix',
      year: 1999,
    })
  })
  it('should return an empty array if there are no screenings', async () => {
    const foundScreenings = await repository.findAll()
    expect(foundScreenings).toHaveLength(0)
  })
})
