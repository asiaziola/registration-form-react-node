import { db } from '../../../database/connectToDb';
import { User } from '../dto/user.dto';

export const addUser = async (userData: User) => {
  const { firstName, lastName, email, eventDate } = userData;
  let userInsert: any = {
    first_name: firstName,
    last_name: lastName,
    email,
    event_date: eventDate,
  };

  const result = await db('users')
    .insert(userInsert)
    .onConflict('email')
    .ignore();

  return userInsert;
};

export const getUsers = async () => {
  const result = await db('users').select('*');
  return result;
};
