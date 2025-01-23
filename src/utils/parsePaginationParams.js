import { DEFAULT_FIRSTPAGE, DEFAULT_PERPAGE } from '../constants/index.js';

const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, DEFAULT_FIRSTPAGE);
  const parsedPerPage = parseNumber(perPage, DEFAULT_PERPAGE);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
