import { requestResetToken } from '../../services/users/requestResetToken.js';

export const requestResetEmailCtrl = async (req, res) => {
  console.log('[DEBUG] Controller started');
  console.log('[DEBUG] req.body:', req.body);

  await requestResetToken(req.body.email);

  console.log('[DEBUG] Controller after requestResetToken');

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};
