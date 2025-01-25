import { WaterCollection } from '../../db/models/water.js';

export const createWaterLog = async (payload) => {
  const waterLog = await WaterCollection.create(payload);
  return waterLog;
};
