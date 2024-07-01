import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { AppConfigType } from './types';

export default registerAs<AppConfigType>(
    'app',
    (): AppConfigType => ({
        environment: process.env.ENVIRONMENT,
        host: process.env.APP_HOST,
        port: Number(process.env.APP_PORT),
        prefix: process.env.APP_PREFIX,
    }),
);
