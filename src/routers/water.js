import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { addWaterSchema, updateWaterSchema } from '../validation/water.js';

import {
  getAllWaterLogsCtrl,
  getWaterLogsForDayCtrl,
  getWaterLogsForMonthCtrl,
  createWaterLogCtrl,
  patchWaterLogCtrl,
  deleteWaterLogCtrl,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

// Get all water logs for the authenticated user
router.get('/', ctrlWrapper(getAllWaterLogsCtrl));

// Get water logs for a specific day
router.get('/per-day', ctrlWrapper(getWaterLogsForDayCtrl));

// Get water logs for a specific month
router.get('/per-month', ctrlWrapper(getWaterLogsForMonthCtrl));

router.post('/', validateBody(addWaterSchema), ctrlWrapper(createWaterLogCtrl));
router.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(patchWaterLogCtrl),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteWaterLogCtrl));

export default router;
