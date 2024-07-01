import { ThrottlerConfigType } from '@Config/types/throttler.config.type';
import { registerAs } from '@nestjs/config';
import process from 'process';

export default registerAs<ThrottlerConfigType>(
    'throttler',
    (): ThrottlerConfigType => ({
        user: {
            ttl: parseInt(process.env.TTL_USER),
            limit: parseInt(process.env.TTL_USER_LIMIT),
        },
    }),
);
