import express, { Request, Response, NextFunction } from 'express';
import { db } from '../database/connectToDb';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  db.select('*')
    .from('users')
    .then((r) => console.log(r));
});

export default router;
