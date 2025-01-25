import { parseCurrentDayParam } from '../../utils/parseFilterDateParam.js';
import { getWaterLogsByDate } from '../../services/water/getWaterLogsByDate.js';

export const getWaterLogsForDayCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const { minDate, filter } = parseCurrentDayParam(date);
  const result = await getWaterLogsByDate(userId, filter);

  res.send({
    status: 200,
    message: 'Successfully found water-logs for the day!',
    data: {
      date: minDate,
      ...result,
    },
  });
};
