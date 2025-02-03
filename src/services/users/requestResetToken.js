import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import path from 'node:path';
import handlebars from 'handlebars';
import { TEMPLATES_DIR } from '../../constants/index.js';
import { SMTP } from '../../constants/index.js';
import { env } from '../../utils/env.js';
import { UsersCollection } from '../../db/models/user.js';
import { sendEmail } from '../../utils/sendMail.js';

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

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

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/password/reset/${resetToken}`,
  });

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
