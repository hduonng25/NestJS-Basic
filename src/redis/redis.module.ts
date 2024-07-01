import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
    imports: [CacheModule.register()],
    providers: [RedisService],
})
export class RedisModule {}
