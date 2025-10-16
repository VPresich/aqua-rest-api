import createHttpError from 'http-errors';
import { UsersCollection } from '../../db/models/user.js';
import jwt from 'jsonwebtoken';
import { env } from '../../utils/env.js';
import { TEMPLATES_DIR } from '../../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { SMTP } from '../../constants/index.js';
//import { sendEmail } from '../../utils/sendMail.js';
import { sendEmail } from '../../utils/sendMailBrevo.js';

export const requestResetToken = async (email) => {
  console.log(' [1] Начало requestResetToken, email:', email);

  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  console.log('EMAIL:', email);

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );
  console.log('RESETTOKEN:', resetToken);

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  console.log('TEMPLATEPATH:', resetPasswordTemplatePath);

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  console.log('TEMPLATE:', template);

  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/password/reset/${resetToken}`,
  });
  console.log('TEST HTML:', html);

  try {
    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.error('Error: ', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
