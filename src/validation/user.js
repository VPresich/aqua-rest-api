import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string.',
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
  }),
});
