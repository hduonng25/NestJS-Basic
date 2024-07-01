import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { AllConfigType } from '@Config/types';
import { adminJsAuth } from './auth';
import { AdminJsResource } from './resource';

@Module({
    imports: [
        import('@adminjs/nestjs').then(({ AdminModule }) =>
            AdminModule.createAdminAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService<AllConfigType>) => {
                    /**
                     * Đối với AdminJS phiên bản 7 trở đi không thể sử dụng import trực tiếp vào CommonJS
                     * Sử dụng cách dưới đây để tiến hành import trực tiếp và sử dụng
                     * */
                    const adminJs = (await import('adminjs')).AdminJS;
                    const adminJsMongoose = await import('@adminjs/mongoose');

                    /**
                     * Đối với MongoDb, Mongoose phải connect tới database trước rồi sử dụng model
                     * */
                    const database = await mongoose.connect(
                        configService.getOrThrow('mongodb.uri', {
                            infer: true,
                        }),
                    );

                    /**
                     * Tiếp đến khởi tạo Adapter cho AdminJS
                     * */
                    adminJs.registerAdapter({
                        Database: adminJsMongoose.Database,
                        Resource: adminJsMongoose.Resource,
                    });

                    /**
                     * Sử dụng databse connect vừa rồi để import reource và cấu hình
                     * */
                    return {
                        adminJsOptions: {
                            resources: AdminJsResource(database),
                        },
                        auth: await adminJsAuth(configService),
                        sessionOptions: {
                            resave: true,
                            saveUninitialized: true,
                            secret: configService.getOrThrow('adminjs.sessionOptionSecret', {
                                infer: true,
                            }),
                        },
                    };
                },
            }),
        ),
    ],
})
export class AdminjsModule {}
