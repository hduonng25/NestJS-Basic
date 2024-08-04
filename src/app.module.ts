import BullConfig from '@Config/bull.config';
import ElasticSearchConfig from '@Config/elasticSearch.config';
import firebaseConfig from '@Config/firebase.config';
import ThrottlerConfig from '@Config/throttler.config';
import { AllConfigType } from '@Config/types';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'node:path';
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
import { SystemModule } from './module/system/system.module';

@Module({
    imports: [
        /**
         * Cấu hình i18n -> Cho phép dự án đa ngôn ngữ
         * fallbackLanguage -> Ngôn ngữ mặc định của ứng dụng
         * loaderOptions => path -> đường dẫn đến thư mục chứa những file ngôn ngữ
         *                  wath -> Cho phép theo dõi sự thay đổi trong file ngôn ngữ
         * resolvers -> Mảng các resolvers để xác định các ngôn ngữ
         *              HeaderResolver -> Xác định ngôn ngữ dựa trên header của request
         *              useFactory -> Lấy tên ngôn ngữ từ cấu hình ứng dụng
         */
        I18nModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<AllConfigType>) => ({
                fallbackLanguage: configService.getOrThrow('app.language', { infer: true }),
                loaderOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: true,
                },
            }),
            resolvers: [
                {
                    inject: [ConfigService],
                    use: HeaderResolver,
                    useFactory: (configService: ConfigService<AllConfigType>) => [
                        configService.getOrThrow('app.headerLanguage', { infer: true }),
                    ],
                },
            ],
        }),
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
        SystemModule,
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
