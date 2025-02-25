import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../../db/models/user.js';

export const registerUser = async (payload) => {
  const email = payload.email;
  const nameFromEmail = email.split('@')[0];

  const user = await UsersCollection.findOne({ email });

  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    name: nameFromEmail,
    ...payload,
    password: encryptedPassword,
  });
};
