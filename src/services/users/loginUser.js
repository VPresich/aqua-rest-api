import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../../db/models/user.js';
import { SessionsCollection } from '../../db/models/session.js';
import { createSession } from './createSession.js';

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });
  const tokens = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    ...tokens,
  });

  return {
    user,
    session: {
      _id: session._id,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  };
};
