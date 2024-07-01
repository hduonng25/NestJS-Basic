import { AllConfigType } from '@Config/types';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProcessorUser } from './processor';

@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<AllConfigType>) => {
                try {
                    Logger.log('Bull queue connect to redis successfully');
                    return {
                        redis: {
                            host: configService.getOrThrow('bull.redis.host', { infer: true }),
                            port: configService.getOrThrow('bull.redis.port', { infer: true }),
                        },
                    };
                } catch (err) {
                    throw err;
                }
            },
        }),
    ],
    providers: [ProcessorUser],
    exports: [ProcessorUser],
})
export class BullModules {}
