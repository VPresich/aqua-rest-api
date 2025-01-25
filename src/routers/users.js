import { Router } from 'express';
import usersCtrl from '../controllers/users/index.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserValidationSchema } from '../validation/user.js';
import {
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/register',
  validateBody(loginUserSchema),
  ctrlWrapper(usersCtrl.registerUserCtrl),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(usersCtrl.loginUserCtrl),
);

ctrlWrapper(usersCtrl.loginUserCtrl),
  router.post('/refresh', ctrlWrapper(usersCtrl.refreshUserSessionCtrl));

router.post('/logout', ctrlWrapper(usersCtrl.logoutUserCtrl));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(usersCtrl.requestResetEmailCtrl),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(usersCtrl.resetPasswordCtrl),
);

router.get('/get-oauth-url', ctrlWrapper(usersCtrl.getGoogleOAuthUrlCtrl));

router.post(
  '/google-login',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(usersCtrl.loginWithGoogleCtrl),
);

router.get('/current', authenticate, ctrlWrapper(usersCtrl.getCurrentUserCtrl));

router.patch(
  '/current',
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserValidationSchema),
  ctrlWrapper(usersCtrl.updateUserCtrl),
);

router.get('/count', ctrlWrapper(usersCtrl.countAllUsersCtrl));

export default router;
