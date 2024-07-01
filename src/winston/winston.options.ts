import { AllConfigType } from '@Config/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import * as Transport from 'winston-transport';
import { LoggerConstant } from './constant';
import { CreateTransportFluentBit, CreateTransportLogstash, TransportOptions } from './transport';
import 'winston-daily-rotate-file';

@Injectable()
export class WinstonOptions implements WinstonModuleOptionsFactory {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
        const enable = this.configService.getOrThrow('logger.enable', { infer: true });

        const options = {
            file: {
                level: 'info',
                datePattern: String(LoggerConstant.DATE_PATTERN),
                filename: this.configService.getOrThrow('logger.log.fileName', { infer: true }),
                handleExceptions: true,
                maxFiles: this.configService.getOrThrow('logger.log.maxFiles', { infer: true }),
                maxSize: this.configService.getOrThrow('logger.log.maxSize', { infer: true }),
                json: true,
            },
            console: {
                level: 'info',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp({
                        format: String(LoggerConstant.TIME_STAMP),
                    }),
                    nestWinstonModuleUtilities.format.nestLike('NestJS-Basic', {
                        prettyPrint: true,
                        colors: true,
                        processId: true,
                    }),
                    winston.format.printf((info: winston.Logform.TransformableInfo) => {
                        const tag: string = !info.tags ? `${LoggerConstant.DEFAULT_TAG}` : info.tags;
                        return `[${tag}] - ${info.timestamp} - [${info.level}] - [${info.context || 'NestApplication'}]: ${info.message}`;
                    }),
                ),
            },
        };

        const transports: Transport[] = [new winston.transports.Console(options.console)];

        switch (true) {
            case enable.logFile:
                const fileTransport: DailyRotateFile = new winston.transports.DailyRotateFile(options.file);
                transports.push(fileTransport);
                break;
            default:
                break;
        }

        switch (true) {
            case enable.logStash:
                const logStashTransport: ElasticsearchTransport | TransportOptions = CreateTransportLogstash(
                    this.configService,
                );
                transports.push(logStashTransport);
                break;
            default:
                break;
        }

        switch (true) {
            case enable.fluentBit:
                const fluentBitTransport: TransportOptions = CreateTransportFluentBit(this.configService);
                transports.push(fluentBitTransport);
                break;
            default:
                break;
        }

        return {
            level: 'info',
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp({
                    format: String(LoggerConstant.TIME_STAMP),
                }),
                nestWinstonModuleUtilities.format.nestLike('NestJS-Basic', {
                    prettyPrint: true,
                    colors: true,
                    processId: true,
                }),
                winston.format.printf((info: winston.Logform.TransformableInfo) => {
                    const tag: string = !info.tags ? `${LoggerConstant.DEFAULT_TAG}` : info.tags;
                    return `[${tag}] - ${info.timestamp} - [${info.level.toUpperCase()}] - [${info.context || 'NestApplication'}]: ${info.message}`;
                }),
            ),
            exitOnError: false,
            transports: transports,
        };
    }
}
