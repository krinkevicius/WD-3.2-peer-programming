import type { Selectable, Insertable } from 'kysely'
import type { Database, Screenings } from '@/database'

const TABLE_NAME = 'screenings'
type ScreeningWithoutId = Omit<Screenings, 'id'>
type ScreeningInsert = Insertable<ScreeningWithoutId>
type ScreeningSelect = Selectable<Screenings>

export default (db: Database) => ({
  create: async (
    movieToAdd: ScreeningInsert
  ): Promise<ScreeningSelect | undefined> =>
    db
      .insertInto(TABLE_NAME)
      .values(movieToAdd)
      .returningAll()
      .executeTakeFirst(),
  findAll: async () =>
    db
      .selectFrom(TABLE_NAME)
      .innerJoin('movies', 'movies.id', 'movieId')
      .selectAll()
      .execute(),

  //   findByIds: async (ids: number[]) =>
  //     db.selectFrom('movies').selectAll().where('id', 'in', ids).execute(),
})
