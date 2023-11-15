import { Kysely, SqliteDatabase, sql } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('timestamp', 'timestamp', (c) => c.notNull())
    .addColumn('total_tickets', 'integer', (c) => c.notNull())
    .addColumn('tickets_left', 'integer')
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .execute()

  await sql`CREATE TRIGGER set_tickets_left AFTER INSERT ON screenings
  BEGIN
  UPDATE screenings SET tickets_left = NEW.total_tickets WHERE id = NEW.id;
  END;`.execute(db)
}

// id - integer - primary key;
// timestamp - timestamp
// total_tickets - integer
// tickets_left - integer
// movie_id - references movies.id

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('screenings').execute()
  await sql`DROP TRIGGER set_tickets_left`.execute(db)
}
