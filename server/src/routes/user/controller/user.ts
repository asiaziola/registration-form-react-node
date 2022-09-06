import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserDTO } from '../dto/user.dto';
import { addUser } from '../service/user';

export const addUserController = async (req: Request, res: Response) => {
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
