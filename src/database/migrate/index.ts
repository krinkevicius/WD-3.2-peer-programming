/* eslint-disable no-console */
import { type Kysely, type MigrationProvider, Migrator } from 'kysely'

export async function migrateToLatest(
  provider: MigrationProvider,
  db: Kysely<any>
) {
  const migrator = new Migrator({
    db,
    provider,
  })

  return migrator.migrateToLatest()
}

export async function migrateDown(
  provider: MigrationProvider,
  db: Kysely<any>
) {
  const migrator = new Migrator({
    db,
    provider,
  })
  return migrator.migrateDown()
}
