import createHttpError from 'http-errors';
import { deleteWaterLog } from '../../services/water/deleteWaterLog.js';

export const deleteWaterLogCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await deleteWaterLog(id, userId);
  if (!contact) {
    throw createHttpError(404, 'Water-log not found');
  }

  res.status(204).send();
};
