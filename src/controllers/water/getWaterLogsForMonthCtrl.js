// import { parseCurrentMonthParam } from '../../utils/parseFilterDateParam.js';
// import { getWaterLogsByDate } from '../../services/water/getWaterLogsByDate.js';

// export const getWaterLogsForMonthCtrl = async (req, res) => {
//   const userId = req.user._id;
//   const { date } = req.query;

//   const filter = parseCurrentMonthParam({ date });
//   console.log('FILTER', filter);
//   const result = await getWaterLogsByDate(userId, filter);
//   console.log('Result', result);

//   const dailyNorm = req.user.waterNorm;

//   const dailyWaterLogs = result.data.reduce((acc, log) => {
//     const day = new Date(log.date).toISOString().split('T')[0];
//     acc[day] = (acc[day] || 0) + log.volume;
//     return acc;
//   }, {});

//   const summary = Object.entries(dailyWaterLogs).map(([day, totalWater]) => ({
//     day,
//     totalWater,
//     percentage:
//       dailyNorm > 0 ? Math.min((totalWater / dailyNorm) * 100, 100) : 0,
//   }));

//   res.send({
//     status: 200,
//     message: 'Successfully found water-logs summary for days of the month!',
//     data: summary,
//   });
// };

import { parseCurrentMonthParam } from '../../utils/parseFilterDateParam.js';
import { getWaterLogsByDate } from '../../services/water/getWaterLogsByDate.js';

export const getWaterLogsForMonthCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const filter = parseCurrentMonthParam({ date });
  console.log('FILTER', filter);
  const result = await getWaterLogsByDate(userId, filter);
  console.log('RESULT', result);

  const dailyNorm = req.user.waterNorm * 1000.0; //in mL
  console.log('DAILYNORM', dailyNorm);

  const dailyWaterLogs = result.data.reduce((acc, log) => {
    const dateObj = new Date(log.date);
    dateObj.setUTCHours(0, 0, 0, 0);
    const isoDate = dateObj.toISOString();
    acc[isoDate] = (acc[isoDate] || 0) + log.volume;
    return acc;
  }, {});

  const summary = Object.entries(dailyWaterLogs).map(([date, totalWater]) => ({
    date,
    totalWater,
    percentage:
      dailyNorm > 0
        ? Math.min(((totalWater / dailyNorm) * 100).toFixed(2), 100)
        : 0,
  }));

  res.send({
    status: 200,
    message: 'Successfully found water-logs summary for days of the month!',
    data: summary,
  });
};
