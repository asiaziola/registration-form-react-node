import { knex, Knex } from 'knex';

const connectToDb = (): Knex => {
  return knex({
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
  });
};

export const db = connectToDb();
