import { resetPassword } from '../../services/users/resetPassword.js';

export const resetPasswordCtrl = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
