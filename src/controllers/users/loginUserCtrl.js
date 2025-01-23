import { setupSession } from '../auth.js';
import { loginUser } from '../../services/users/loginUser.js';

export const loginUserCtrl = async (req, res) => {
  const { user, session } = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};
