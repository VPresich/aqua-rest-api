import { WaterCollection } from '../../db/models/water.js';

export const deleteWaterLog = async (id, userId) => {
  const waterLog = await WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return waterLog;
};
