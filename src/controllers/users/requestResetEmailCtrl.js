import { requestResetToken } from '../../services/users/requestResetToken.js';

export const requestResetEmailCtrl = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};
