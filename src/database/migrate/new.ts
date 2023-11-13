/* eslint-disable no-console */
import { writeFile } from 'fs/promises'

const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Error! Please provide a migration name!')
  process.exit(1)
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:]/g, '')
  .replace(/\.\d+/, '')

const fileName = `${timestamp}-${migrationName}.ts`

const fileContent = `
import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  // Add up migration implementation
}

export async function down(db: Kysely<SqliteDatabase>) {
  // Add down migration implementation
}
`

async function createFile() {
  try {
    await writeFile(`src/database/migrations/${fileName}`, fileContent, 'utf-8')
  } catch (error) {
    console.error(`File could not be created! ${error}`)
  }
}

createFile()
