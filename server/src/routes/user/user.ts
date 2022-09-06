import express, { Request, Response, NextFunction } from 'express';
import { validations } from './validations/user';
import { addUserController } from './controller/user';

const router = express.Router();

router.post("/", validations, addUserController);

export default router;
