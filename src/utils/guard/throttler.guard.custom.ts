import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';
import { ThrottlerExceptionCustom } from '@Utils/exception';
import { Request } from 'express';

@Injectable()
export class ThrottlerGuardCustom extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
        throttlerLimitDetail: ThrottlerLimitDetail,
    ): Promise<void> {
        const request: Request = context.switchToHttp().getRequest();
        const ip: string = request.ip;

        const ttl: number = Math.floor(throttlerLimitDetail.ttl / 1000);
        const limit: number = throttlerLimitDetail.limit;

        const key: string = this.generateKey(context, ip, '');
        const { totalHits } = await this.storageService.increment(key, ttl);

        const message = {
            vi: `Quá nhiều yêu cầu từ IP ${ip}. Giới hạn ${limit} yêu cầu/${ttl} giây. Hiện tại: ${totalHits} yêu cầu..`,
            en: `Too many requests from IP ${ip}, please try again in ${ttl} seconds.`,
        };

        throw new ThrottlerExceptionCustom(message, ttl, limit, totalHits);
    }
}
