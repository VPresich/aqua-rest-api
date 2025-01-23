import { CONTACT_TYPE } from "../constants/index.js";
function parseBoolean(value) {
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') {
      return true;
    }
    if (lowerValue === 'false') {
      return false;
    }
  }
  return undefined;
}
  
  const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isValidType = (type) => Object.values(CONTACT_TYPE).includes(type);
  
    if (isValidType(type)) return type;
  };
  
  export const parseFilterParams = (query) => {
    const { isFavourite, contactType } = query;   
    const parsedFavoriteStatus = parseBoolean(isFavourite);
    const parsedContactType = parseContactType(contactType);
   
    return {
      isFavourite: parsedFavoriteStatus,
      contactType: parsedContactType,
    };
  };
