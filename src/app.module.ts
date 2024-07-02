import BullConfig from '@Config/bull.config';
import ElasticSearchConfig from '@Config/elasticSearch.config';
import firebaseConfig from '@Config/firebase.config';
import ThrottlerConfig from '@Config/throttler.config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import AdminjsConfig from './config/adminjs.config';
import AppConfig from './config/app.config';
import LoggerConfig from './config/logger.config';
import MongodbConfig from './config/mongodb.config';
import TypeormConfig from './config/typeorm.config';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './module/product/product.module';
import { UserModule } from './module/user/user.module';
import { ResponseInterceptor } from '@Utils/interceptor';
import { PaginationMiddleware, RequestLogMiddleware } from '@Utils/middleware';
import { ElkModule } from './elk/elk.module';
import { RedisModule } from './redis/redis.module';
import { WinstonLoggerModule } from './winston/winston.module';
import { FirebaseModules } from './firebase/firebase.module';
import { BullModules } from './bull/bull.module';
import { DynamicModules } from './dynamic/dynamic.module';

@Module({
    imports: [
        DatabaseModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                AppConfig,
                MongodbConfig,
                AdminjsConfig,
                LoggerConfig,
                TypeormConfig,
                ElasticSearchConfig,
                ThrottlerConfig,
                firebaseConfig,
                BullConfig,
            ],
            envFilePath: ['.env'],
        }),
        UserModule,
        ProductModule,
        WinstonLoggerModule,
        ElkModule,
        RedisModule,
        FirebaseModules,
        BullModules,
        DynamicModules,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(PaginationMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
        consumer.apply(RequestLogMiddleware).forRoutes('*');
    }
}
