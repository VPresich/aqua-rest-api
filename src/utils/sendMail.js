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
    console.log('⏳ Проверяю соединение...');
    await transporter.verify();
    console.log('✅ SMTP подключение успешно!');
  } catch (err) {
    console.error('Ошибка при проверке SMTP:', err.message);
    throw createHttpError(500, `Ошибка при проверке SMTP: ${err.message}`);
  }

  console.log(' Отправка письма...', options);

  await transporter.sendMail(options);
  console.log('Письмо отправлено:');
};
