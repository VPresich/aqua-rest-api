export const getStartOfDayISO = (date) => {
  const minDate = new Date(date);
  minDate.setUTCHours(0, 0, 0, 0);
  return minDate.toISOString();
};

export const getEndOfDayISO = (date) => {
  const maxDate = new Date(date);
  maxDate.setUTCHours(23, 59, 59, 999);
  return maxDate.toISOString();
};

export const getStartOfMonthISO = (date) => {
  const minDate = new Date(date);
  minDate.setUTCDate(1);
  minDate.setUTCHours(0, 0, 0, 0);
  return minDate.toISOString();
};

export const getEndOMonthISO = (date) => {
  const maxDate = new Date(date);
  maxDate.setUTCMonth(maxDate.getMonth() + 1);
  maxDate.setUTCDate(0);
  maxDate.setUTCHours(23, 59, 59, 999);
  return maxDate.toISOString();
};

export const parseCurrentDayParam = (parsedDate) => {
  const minDateISO = getStartOfDayISO(parsedDate);
  const maxDateISO = getEndOfDayISO(parsedDate);

  return {
    minDate: minDateISO,
    filter: {
      date: { $gte: minDateISO, $lte: maxDateISO },
    },
  };
};

export const parseCurrentMonthParam = (parsedDate) => {
  const minDateISO = getStartOfMonthISO(parsedDate);
  const maxDateISO = getEndOMonthISO(parsedDate);
  return {
    minDate: minDateISO,
    filter: {
      date: {
        $gte: minDateISO,
        $lte: maxDateISO,
      },
    },
  };
};
