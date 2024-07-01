import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { AdminJSConfigType } from './types';

export default registerAs<AdminJSConfigType>(
    'adminjs',
    (): AdminJSConfigType => ({
        user: process.env.ADMINJS_USER,
        password: process.env.ADMINJS_PASSWORD,
        rootPath: process.env.ADMINJS_ROOTPATH,
        cookieName: process.env.ADMINJS_COOKIE_NAME,
        cookiePassword: process.env.ADMINJS_COOKIE_PASSWORD,
        sessionOptionSecret: process.env.ADMINJS_SESSION_OPTION_SECRET,
    }),
);
