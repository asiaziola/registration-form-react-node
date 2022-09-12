import { knex, Knex } from 'knex';

const connectToDb = (): Knex => {
  if (process.env.NODE_ENV !== 'cypress') {
    return knex({
      client: 'pg',
      connection: {
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ...(process.env.NODE_ENV == 'development'
          ? ''
          : { ssl: { rejectUnauthorized: false } }),
      },
    });
  } else {
    return knex({
      client: 'sqlite3',
      connection: {
        filename: ':memory:',
      },
      useNullAsDefault: true,
    });
  }
};

export const db = connectToDb();
