import { UsersCollection } from '../../db/models/user.js';

export const usersCounter = async () => {
  return await UsersCollection.countDocuments();
};
