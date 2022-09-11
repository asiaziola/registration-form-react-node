import express from 'express';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import bodyParser from 'body-parser';
import { db } from './database/connectToDb';
import { initDb } from './database/initDb';
import path from 'path';

require('dotenv').config();

(async () => {
  await initDb(db);
})();

const app = express();
const port = process.env.PORT || 3001;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(
  express.static(
    path.resolve(
      __dirname,
      process.env.NODE_ENV == 'development'
        ? '../../client/build'
        : '../../../client/build'
    )
  )
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(appRouter);

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      process.env.NODE_ENV == 'development'
        ? '../../../client/build'
        : '../../../client/build',
      'index.html'
    )
  );
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    console.log(`App listening on port: ${port}`);
  });
}

export default app;
