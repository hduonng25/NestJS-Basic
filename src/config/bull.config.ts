import { BullConfigType } from '@Config/types/bull.config.type';
import { registerAs } from '@nestjs/config';
import process from 'process';

export default registerAs<BullConfigType>(
    'bull',
    (): BullConfigType => ({
        redis: {
            host: process.env.BULL_REDIS_HOST,
            port: parseInt(process.env.BULL_REDIS_PORT),
        },
    }),
);
