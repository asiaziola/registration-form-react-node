import express from 'express';
import addUser from './addUser';

const router = express.Router();

router.use('/api/addUser', addUser);
export { router as appRouter };
