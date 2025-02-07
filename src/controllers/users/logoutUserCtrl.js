import { logoutUser } from '../../services/users/logoutUser.js';

export const logoutUserCtrl = async (req, res) => {
  console.log('COOKIES', req.cookies.sessionId);
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
