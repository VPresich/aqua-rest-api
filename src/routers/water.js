import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateDateParameter } from '../middlewares/validateDateParameter.js';
import { addWaterSchema, updateWaterSchema } from '../validation/water.js';
import waterCtrl from '../controllers/water/index.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(waterCtrl.getAllWaterLogsCtrl));
router.get(
  '/day',
  validateDateParameter,
  ctrlWrapper(waterCtrl.getWaterLogsForDayCtrl),
);
router.get(
  '/month',
  validateDateParameter,
  ctrlWrapper(waterCtrl.getWaterLogsForMonthCtrl),
);

router.post(
  '/',
  validateBody(addWaterSchema),
  ctrlWrapper(waterCtrl.createWaterLogCtrl),
);

router.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(waterCtrl.updateWaterLogCtrl),
);

router.delete('/:id', isValidId, ctrlWrapper(waterCtrl.deleteWaterLogCtrl));

export default router;
