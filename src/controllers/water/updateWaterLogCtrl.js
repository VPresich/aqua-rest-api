import createHttpError from 'http-errors';
import { updateWaterLog } from '../../services/water/updateWaterLog.js';

export const updateWaterLogCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const payload = { ...req.body, userId };

  const result = await updateWaterLog(id, payload);

  if (!result) {
    throw createHttpError(404, 'Water-log not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a waterLog!`,
    data: result.waterLog,
  });
};
