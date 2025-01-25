import createHttpError from 'http-errors';

export const validateDateParameter = (req, res, next) => {
  const { date } = req.query;

  if (!date) {
    throw createHttpError(400, 'Bad Request. Date parameter is required');
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw createHttpError(400, 'Bad Request. Invalid Date format');
  }

  next();
};
