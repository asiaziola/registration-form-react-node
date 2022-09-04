import express from 'express';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(appRouter);

const server = app.listen(port, function () {
  console.log('App listening on port: ' + port);
});

export { server };
