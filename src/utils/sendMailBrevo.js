import axios from 'axios';
import createHttpError from 'http-errors';
import { env } from './env.js';
import { SMTP } from '../constants/index.js';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('Отправка письма через Brevo API...');

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

    console.log('Письмо отправлено:', response.data);
    return response.data;
  } catch (err) {
    console.error(
      'Ошибка при отправке письма через Brevo API:',
      err.response?.data || err.message,
    );
    throw createHttpError(500, 'Не удалось отправить email через Brevo API');
  }
};
