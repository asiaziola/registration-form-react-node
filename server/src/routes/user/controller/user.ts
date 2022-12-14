import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserDTO } from '../dto/user.dto';
import { addUser, getUsers } from '../service/user';

export const addUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await addUser(new UserDTO(req.body));
    return res.status(200).json(result);
  } catch (e) {
    res.status(500);
    res.json({ errors: e.message });
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getUsers();
    return res.status(200).json(result);
  } catch (e) {
    res.status(500);
    res.json({ errors: e.message });
  }
};
