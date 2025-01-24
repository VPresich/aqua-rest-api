import { REFRESH_TOKEN_LIFETIME } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';

export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
};

export const getGoogleOAuthUrlCtrl = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleCtrl = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// export const updateUserCtrl = async (req, res) => {
//   const userId = req.user._id;
//   const avatar = req.file;

//   let avatarUrl = null;

//   if (avatar) {
//     if (env('ENABLE_CLOUDINARY') === 'true') {
//       avatarUrl = await saveFileToCloudinary(avatar);
//     } else {
//       avatarUrl = await saveFileToUploadDir(avatar);
//     }
//   }

//   const payload = { ...req.body };
//   if (avatar && avatarUrl) payload.avatar = avatarUrl;

//   const result = await updateUser(userId, payload);

//   if (!result) {
//     throw createHttpError(404, 'User not found');
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched the user!`,
//     data: result.user,
//   });
// };
