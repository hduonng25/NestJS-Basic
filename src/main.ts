import { AllConfigType } from '@Config/types';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validationOptions } from '@Utils/validations';
import * as mongoose from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@Utils/exceptionFIlter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: false,
        autoFlushLogs: true,
    });

    const configService = app.get(ConfigService<AllConfigType>);

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const host: string = configService.getOrThrow('app.host', { infer: true });
    const port: number = configService.getOrThrow('app.port', { infer: true });
    const prefix: string = configService.getOrThrow('app.prefix', {
        infer: true,
    });

    app.useGlobalPipes(new ValidationPipe(validationOptions));
    // app.useGlobalFilters(new HttpExceptionFilter())

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

    /**
     * Sử dụng để loại bỏ các trường bị đánh @Exclude khỏi data trả ra
     * Sử dụng để hiển thị những data theo Group riêng biệt được cấu hình trong Entity và Controller
     * - Lưu ý: Sử dụng khi sử dụng TypeOrm, khi sử dụng mongo có thể dùng $project để chọn dữ liệu trả ra
     */
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.setGlobalPrefix(prefix);
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    mongoose.set('debug', configService.getOrThrow('app.environment', { infer: true }) === 'dev');

    await app.listen(port, host, () => {
        Logger.log(`Listening on : ${host}:${port}`, 'NestApplication');
    });
}

/**
 * corepack use <package manager>
 */
void bootstrap();
