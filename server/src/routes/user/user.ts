import express from 'express';
import { validations } from './validations/user';
import { addUserController } from './controller/user';

const router = express();

router.post('/', validations, addUserController);

export default router;
