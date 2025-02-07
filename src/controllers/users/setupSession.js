import { REFRESH_TOKEN_LIFETIME } from '../../constants/index.js';
import { env } from '../../utils/env.js';

export const setupSession = (res, session) => {
  const isModeProduction = env('NODE_ENV_PRODUCTION') === 'true';

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: isModeProduction,
    sameSite: isModeProduction ? 'None' : 'Lax',
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: isModeProduction,
    sameSite: isModeProduction ? 'None' : 'Lax',
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
};
