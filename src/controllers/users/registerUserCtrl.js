import { registerUser } from '../../services/users/registerUser.js';
export const registerUserCtrl = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    user: { _id: user._id, name: user.name, email: user.email },
  });
};
