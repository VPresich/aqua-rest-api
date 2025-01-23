export const parseCurrentDayParam = (query) => {
  const { date } = query;
  const parsedDate = date ? new Date(date) : new Date();

  const minDate = new Date(parsedDate);
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(parsedDate);
  maxDate.setHours(23, 59, 59, 999);

  return { date: { $gte: minDate.toISOString(), $lte: maxDate.toISOString() } };
};

export const parseCurrentMonthParam = (query) => {
  const { date } = query;
  const parsedDate = date ? new Date(date) : new Date();

  const minDate = new Date(parsedDate);
  minDate.setDate(1);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date(parsedDate);
  maxDate.setMonth(parsedDate.getMonth() + 1);
  maxDate.setDate(0);
  maxDate.setHours(23, 59, 59, 999);

  return {
    date: {
      $gte: minDate.toISOString(),
      $lte: maxDate.toISOString(),
    },
  };
};
