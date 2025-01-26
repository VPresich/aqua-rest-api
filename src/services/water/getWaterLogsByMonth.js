import { WaterCollection } from '../../db/models/water.js';
import { getStartOfDayISO } from '../../utils/parseFilterDateParam.js';

export const getWaterLogsByMonth = async (userId, filter = {}) => {
  const { date } = filter;
  const waterLogsQuery = WaterCollection.find({ userId });

  if (date) {
    waterLogsQuery.where('date').gte(date.$gte).lte(date.$lte);
  }

  const waterLogs = await waterLogsQuery.lean().exec();

  const dayItems = waterLogs.reduce((acc, log) => {
    const day = getStartOfDayISO(log.date);
    acc[day] = (acc[day] || 0) + log.volume;
    return acc;
  }, {});

  const monthItems = Object.entries(dayItems)
    .filter(([date, totalDayWater]) => totalDayWater > 0)
    .map(([date, totalDayWater]) => ({
      date,
      totalDayWater,
    }));

  return {
    monthItems,
  };
};
