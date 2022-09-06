import express from 'express';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import bodyParser from 'body-parser';
import { db } from './database/connectToDb';
import { initDb } from './database/initDb';

require('dotenv').config();

(async () => {
  await initDb(db);
})();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(appRouter);

app.listen(port, function () {
  console.log(`App listening on port: ${port}`);
});

export default app;
