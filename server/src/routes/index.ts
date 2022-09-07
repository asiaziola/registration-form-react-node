import express from 'express';
import addUser from './user/user';

const router = express.Router();

router.use('/api/users', addUser);

export { router as appRouter };
