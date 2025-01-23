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

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().min(2).max(20).messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be at most 15 characters long.',
  }),

  email: Joi.string().email().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Please provide a valid email address.',
  }),

  gender: Joi.string()
    .valid('male', 'female')
    .description('Gender of the User')
    .example('female'),

  weight: Joi.number()
    .min(0)
    .max(250)
    .description("User's weight (kg)")
    .example(56),

  sportTime: Joi.number()
    .min(0)
    .max(24)
    .description('Active time for sports (hours)')
    .example(1),

  waterNorm: Joi.number()
    .min(50)
    .max(5000)
    .description('Daily water intake norm (mL)')
    .example(1.8),
});
