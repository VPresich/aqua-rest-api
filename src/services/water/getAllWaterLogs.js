import { WaterCollection } from '../../db/models/water.js';

export const getAllWaterLogs = async (userId) => {
  const waterLogs = await WaterCollection.find({ userId }).exec();
  return waterLogs;
};
