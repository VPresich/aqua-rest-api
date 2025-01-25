import { generateAuthUrl } from '../../utils/googleOAuth2.js';

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
