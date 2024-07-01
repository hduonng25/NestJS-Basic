import { AllConfigType } from '@Config/types';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuardCustom } from '@Utils/guard';
import { ElkModule } from '../../elk/elk.module';
import { UsersModel, UserSchema } from './schema';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'user',
        }),
        MongooseModule.forFeature([{ name: UsersModel.name, schema: UserSchema }]),
        ElkModule,
        /**
         * Sử dụng để giới hạn số Req gọi đến trong 1 khoảng thời gian nhất định
         */
        ThrottlerModule.forRootAsync({
            useFactory: (configService: ConfigService<AllConfigType>) => ({
                throttlers: [
                    {
                        ttl: seconds(configService.getOrThrow('throttler.user.ttl', { infer: true })),
                        limit: configService.getOrThrow('throttler.user.limit', { infer: true }),
                    },
                ],
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        UserService,
        UserRepository,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuardCustom,
        },
    ],
    controllers: [UserController],
})
export class UserModule {}
