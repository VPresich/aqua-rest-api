import { getAllWaterLogs } from '../../services/water/getAllWaterLogs.js';

export const getAllWaterLogsCtrl = async (req, res) => {
  const userId = req.user._id;
  const waterLogs = await getAllWaterLogs(userId);
  res.send({
    status: 200,
    message: 'Successfully found user all water-logs!',
    data: waterLogs,
  });
};
