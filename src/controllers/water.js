import createHttpError from 'http-errors';

import {
  parseCurrentDayParam,
  parseCurrentMonthParam,
} from '../utils/parseFilterDateParam.js';

import {
  getAllWaterLogs,
  createWaterLog,
  updateWaterLog,
  deleteWaterLog,
  getWaterLogsByDate,
} from '../services/water.js';

export const getAllWaterLogsCtrl = async (req, res) => {
  const userId = req.user._id;
  const waterLogs = await getAllWaterLogs(userId);
  res.send({
    status: 200,
    message: 'Successfully found user all water-logs!',
    data: waterLogs,
  });
};

export const getWaterLogsForDayCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const filter = parseCurrentDayParam({ date });
  const result = await getWaterLogsByDate(userId, filter);

  res.send({
    status: 200,
    message: 'Successfully found water-logs for the day!',
    data: result.data,
  });
};

export const getWaterLogsForMonthCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const filter = parseCurrentMonthParam({ date });
  console.log('FILTER', filter);
  const result = await getWaterLogsByDate(userId, filter);
  console.log('Result', result);

  const dailyNorm = req.user.waterNorm;

  const dailyWaterLogs = result.data.reduce((acc, log) => {
    const day = new Date(log.date).toISOString().split('T')[0];
    acc[day] = (acc[day] || 0) + log.volume;
    return acc;
  }, {});

  const summary = Object.entries(dailyWaterLogs).map(([day, totalWater]) => ({
    day,
    totalWater,
    percentage:
      dailyNorm > 0 ? Math.min((totalWater / dailyNorm) * 100, 100) : 0,
  }));

  res.send({
    status: 200,
    message: 'Successfully found water-logs summary for days of the month!',
    data: summary,
  });
};

export const createWaterLogCtrl = async (req, res) => {
  const userId = req.user._id;
  const payload = { ...req.body, userId };

  const waterLog = await createWaterLog(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a water-log!`,
    data: waterLog,
  });
};

export const patchWaterLogCtrl = async (req, res) => {
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

export const deleteWaterLogCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await deleteWaterLog(id, userId);
  if (!contact) {
    throw createHttpError(404, 'Water-log not found');
  }

  res.status(204).send();
};
