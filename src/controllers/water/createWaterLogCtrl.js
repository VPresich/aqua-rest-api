import { createWaterLog } from '../../services/water/createWaterLog.js';

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
