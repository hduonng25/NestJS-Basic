import { registerAs } from '@nestjs/config';
import { JwtConfigType } from './types';

export default registerAs<JwtConfigType>(
    'jwt',
    (): JwtConfigType => ({
        secret: process.env.JWT_SECRET,
        refresh: process.env.JWT_REFRESH,
        accessTokenExpired: parseInt(process.env.ACCESS_TOKEN_EXPIRED),
        refreshTokenExpired: parseInt(process.env.REFRESH_TOKEN_EXPIRED)
    }),
);
