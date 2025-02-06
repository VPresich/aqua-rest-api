import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { validateCode } from '../../utils/googleOAuth2.js';
import { UsersCollection } from '../../db/models/user.js';
import { SessionsCollection } from '../../db/models/session.js';
import { getFullNameFromGoogleTokenPayload } from '../../utils/googleOAuth2.js';
import { createSession } from './createSession.js';

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await UsersCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
  } else {
    await SessionsCollection.deleteMany({ userId: user._id });
  }

  const newSession = createSession();
  console.log('CREATESESSION');
  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });

  return { session, user };
};
