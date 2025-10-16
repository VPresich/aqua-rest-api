import axios from 'axios';
import createHttpError from 'http-errors';
import { env } from './env.js';
import { SMTP } from '../constants/index.js';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Aqua-App',
          email: env(SMTP.SMTP_FROM),
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key': env(SMTP.SMTP_APIKEY),
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      },
    );
    return response.data;
  } catch (err) {
    console.error(
      'Error of send email through Brevo API:',
      err.response?.data || err.message,
    );
    throw createHttpError(500, 'Failed to send email through Brevo API');
  }
};
