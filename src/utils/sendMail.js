import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
      user: env(SMTP.SMTP_USER),
      pass: env(SMTP.SMTP_PASSWORD),
    },
    connectionTimeout: 5000,
  });

  try {
    await transporter.verify();
  } catch (err) {
    throw createHttpError(500, `Error verifying SMTP: ${err.message}`);
  }

  await transporter.sendMail(options);
};
