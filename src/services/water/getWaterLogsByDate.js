import { WaterCollection } from '../../db/models/water.js';

export const getWaterLogsByDate = async (userId, filter = {}) => {
  const { date } = filter;
  const waterLogsQuery = WaterCollection.find({ userId });

  if (date) {
    waterLogsQuery.where('date').gte(date.$gte).lte(date.$lte);
  }
  const waterLogs = await waterLogsQuery.lean().exec();
  const totalDayWater = waterLogs.reduce((total, log) => total + log.volume, 0);

  return {
    totalDayWater,
    dayItems: waterLogs,
  };
};
