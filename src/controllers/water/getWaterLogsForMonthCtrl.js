import { parseCurrentMonthParam } from '../../utils/parseFilterDateParam.js';
import { getWaterLogsByMonth } from '../../services/water/getWaterLogsByMonth.js';

export const getWaterLogsForMonthCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;
  const { minDate, filter } = parseCurrentMonthParam(date);

  const result = await getWaterLogsByMonth(userId, filter);

  res.send({
    status: 200,
    message: 'Successfully found water-logs summary for days of the month!',
    data: {
      date: minDate,
      ...result,
    },
  });
};
