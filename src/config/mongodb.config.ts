import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { MongoConfigType } from './types';

export default registerAs<MongoConfigType>(
    'mongodb',
    (): MongoConfigType => ({
        host: process.env.MONGO_HOST,
        port: Number(process.env.MONGO_PORT),
        dbName: process.env.DB_NAME,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${Number(process.env.MONGO_PORT)}/${process.env.DB_NAME}`,
    }),
);
