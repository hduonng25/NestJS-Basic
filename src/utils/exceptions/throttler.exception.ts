import { HttpException, HttpStatus } from '@nestjs/common';

export class ThrottlerExceptionCustom extends HttpException {
    constructor(message: string | Record<string, any>, ttl: number, limit: number, current: number) {
        super(
            {
                status: HttpStatus.TOO_MANY_REQUESTS,
                error: 'Throttler error',
                message,
                ttl,
                limit,
                current,
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}
