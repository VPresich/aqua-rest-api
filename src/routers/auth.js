import { Router } from 'express';
import {
  registerUserCtrl,
  loginUserCtrl,
  refreshUserSessionCtrl,
  logoutUserCtrl,
  requestResetEmailCtrl,
  resetPasswordCtrl,
  getGoogleOAuthUrlCtrl,
  loginWithGoogleCtrl,
  getCurrentUserCtrl,
  updateUserCtrl,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserValidationSchema } from '../validation/auth.js';
import {
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/register',
  validateBody(loginUserSchema),
  ctrlWrapper(registerUserCtrl),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserCtrl),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionCtrl));

router.post('/logout', ctrlWrapper(logoutUserCtrl));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailCtrl),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordCtrl),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlCtrl));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleCtrl),
);

router.get('/current', authenticate, ctrlWrapper(getCurrentUserCtrl));

router.patch(
  '/current',
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserValidationSchema),
  ctrlWrapper(updateUserCtrl),
);

export default router;
