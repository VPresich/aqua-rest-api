import { WaterCollection } from '../db/models/water.js';

export const getWaterLogsByDate = async (userId, filter = {}) => {
  const { date } = filter;

  const waterLogsQuery = WaterCollection.find({ userId });

  if (date) {
    waterLogsQuery.where('date').gte(date.$gte).lte(date.$lte);
  }

  const waterLogs = await waterLogsQuery.exec();

  return {
    data: waterLogs || [],
  };
};

export const getAllWaterLogs = async (userId) => {
  const waterLogs = await WaterCollection.find({ userId }).exec();
  return waterLogs;
};

export const createWaterLog = async (payload) => {
  const waterLog = await WaterCollection.create(payload);
  return waterLog;
};

export const updateWaterLog = async (id, payload, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: id, userId: payload.userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    waterLog: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWaterLog = async (id, userId) => {
  const waterLog = await WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return waterLog;
};
