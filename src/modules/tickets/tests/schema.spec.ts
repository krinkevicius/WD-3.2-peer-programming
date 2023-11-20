import { parse } from '../schema'

describe('parse', () => {
  it('should parse valid ticket booking', () => {
    const ticketToParse = {
      id: 1,
      ticketNumber: 8,
      screeningId: 3,
    }
    expect(parse(ticketToParse)).toEqual(ticketToParse)
  })

  it('should throw error if ticketNumber is not provided', () => {
    const ticketToParse = {
      id: 1,
      screeningId: 3,
    }
    expect(() => parse(ticketToParse)).toThrowError()
  })
})
