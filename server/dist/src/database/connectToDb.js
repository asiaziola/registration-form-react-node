"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = require("knex");
const connectToDb = () => {
    return (0, knex_1.knex)({
        client: 'pg',
        connection: {
            host: process.env.PGHOST,
            port: parseInt(process.env.PGPORT),
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            ssl: { rejectUnauthorized: false },
        },
    });
};
exports.db = connectToDb();
//# sourceMappingURL=connectToDb.js.map