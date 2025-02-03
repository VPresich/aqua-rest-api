import { loginOrSignupWithGoogle } from '../../services/users/loginOrSignupWithGoogle.js';
import { setupSession } from './setupSession.js';

export const loginWithGoogleCtrl = async (req, res) => {
  const { session, user } = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
      user,
    },
  });
};
