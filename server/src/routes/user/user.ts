import express from 'express';
import { validations } from './validations/user';
import { addUserController, getUsersController } from './controller/user';

const router = express();

router.post('/', validations, addUserController);

router.get('/', getUsersController);

export default router;
