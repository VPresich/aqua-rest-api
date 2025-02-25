import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../../utils/saveFileToUploadDir.js';
import { env } from '../../utils/env.js';
import { updateUser } from '../../services/users/updateUser.js';

export const updateUserCtrl = async (req, res) => {
  const userId = req.user._id;
  const avatar = req.file;

  let avatarUrl = null;

  if (avatar) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(avatar);
      console.log('AVATARURL', avatarUrl);
    } else {
      avatarUrl = await saveFileToUploadDir(avatar);
    }
  }

  const payload = { ...req.body };

  if (avatar && avatarUrl) {
    payload.avatarURL = avatarUrl;
  }

  const result = await updateUser(userId, payload);

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched the user!`,
    user: result.user,
  });
};
