import { body } from 'express-validator';

export const validations = [
  body('firstName').exists().isString().notEmpty(),
  body('lastName').exists().isString().notEmpty(),
  body('email').exists().isEmail().notEmpty(),
  body('eventDate').exists().isDate().notEmpty(),
];
