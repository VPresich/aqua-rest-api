import { usersCounter } from '../../services/users/usersCounter.js';

export const countAllUsersCtrl = async (req, res) => {
  const usersCount = await usersCounter();
  res.json({
    status: 200,
    message: 'Number of users successfully received!',
    data: {
      usersCount,
    },
  });
};
