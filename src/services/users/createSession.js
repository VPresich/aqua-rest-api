import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../../constants/index.js';

const generateSecureToken = (size = 30) => randomBytes(size).toString('base64');

export const createSession = () => {
  const accessToken = generateSecureToken();
  const refreshToken = generateSecureToken();

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  };
};
