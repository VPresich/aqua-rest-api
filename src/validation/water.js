import Joi from 'joi';

export const addWaterSchema = Joi.object({
  volume: Joi.number().min(0.1).required().messages({
    'number.base': 'Volume must be a number.',
    'number.min': 'Volume must be at least 50.',
    'any.required': 'Volume is required.',
  }),
  date: Joi.date()
    .optional()
    .default(() => new Date())
    .messages({
      'date.base': 'Date must be a valid date.',
    }),
});

export const updateWaterSchema = Joi.object({
  volume: Joi.number().min(0.1).optional().messages({
    'number.base': 'Volume must be a number.',
    'number.min': 'Volume must be at least 50.',
  }),
  date: Joi.date().optional().messages({
    'date.base': 'Date must be a valid date.',
  }),
}).or('volume', 'date');
