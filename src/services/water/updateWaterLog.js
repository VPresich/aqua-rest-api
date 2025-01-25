import { WaterCollection } from '../../db/models/water.js';

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
