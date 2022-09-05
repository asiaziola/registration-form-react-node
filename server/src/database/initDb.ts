import { Knex } from 'knex';

export async function initDb(db: Knex) {
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name', 64).notNullable().index();
      table.string('last_name', 64).notNullable().index();
      table.string('email', 64).notNullable().unique().index();
      table.dateTime('event_date');
    });
  }
}
