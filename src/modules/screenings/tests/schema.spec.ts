import { parse } from '../schema'

describe('parse', () => {
  it('should parse a valid screening', () => {
    const screeningToParse = {
      id: 1,
      timestamp: '20231115T172025Z',
      totalTickets: 250,
      ticketsLeft: 20,
      movieId: 1,
    }
    expect(parse(screeningToParse)).toEqual(screeningToParse)
  })

  it('should throw error if timestamp is not provided', () => {
    const screeningToParse = {
      id: 1,
      totalTickets: 250,
      ticketsLeft: 20,
      movieId: 1,
    }
    expect(() => parse(screeningToParse)).toThrowError()
  })
})

// export interface Screenings {
//     id: Generated<number>;
//     timestamp: string;
//     totalTickets: number;
//     ticketsLeft: number | null;
//     movieId: number;
//   }
