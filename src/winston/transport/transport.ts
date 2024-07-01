import { AllConfigType } from '@Config/types';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { LoggerConstant } from '../constant';
import { TransportOptions } from './transport.options';

export function CreateTransportLogstash(configService: ConfigService<AllConfigType>) {
    const host: string = configService.getOrThrow('logger.logStash.host', { infer: true });
    const port: number = configService.getOrThrow('logger.logStash.port', { infer: true });
    const protocol: string = configService.getOrThrow('logger.logStash.protocol', { infer: true });
    const node: string = configService.getOrThrow('elasticSearch.node', { infer: true });
    const username: string = configService.getOrThrow('elasticSearch.username', { infer: true });
    const password: string = configService.getOrThrow('elasticSearch.password', { infer: true });

    if (!host || (!port && !Number.isInteger(port))) {
        throw new Error('');
    }

    if (
        !protocol &&
        protocol != LoggerConstant.PROTOCOL_UDP &&
        protocol != LoggerConstant.PROTOCOL_TCP &&
        protocol != LoggerConstant.PROTOCOL_HTTP
    ) {
        throw new Error('');
    }

    switch (protocol) {
        case LoggerConstant.PROTOCOL_HTTP:
            const esclient = new Client({
                node,
                auth: {
                    username,
                    password,
                },
            });

            return new ElasticsearchTransport({
                level: 'info',
                client: esclient,
                indexPrefix: 'app-logs-',
                indexSuffixPattern: 'YYYY.MM.DD',
            });

        default:
            return new TransportOptions({
                host,
                port,
                protocol: protocol as LoggerConstant.PROTOCOL_TCP | LoggerConstant.PROTOCOL_UDP,
                handleExceptions: true,
            });
    }
}

export function CreateTransportFluentBit(configService: ConfigService<AllConfigType>) {
    const host: string = configService.getOrThrow('logger.fluentBit.host', { infer: true });
    const port: number = configService.getOrThrow('logger.fluentBit.port', { infer: true });
    const protocol: string = configService.getOrThrow('logger.fluentBit.protocol', { infer: true });
    const prefix: string = configService.getOrThrow('logger.fluentBit.prefix', { infer: true });

    if (!host || (!port && !Number.isInteger(port))) {
        throw new Error('');
    }

    if (
        !protocol &&
        protocol != LoggerConstant.PROTOCOL_UDP &&
        protocol != LoggerConstant.PROTOCOL_TCP &&
        protocol != LoggerConstant.PROTOCOL_PORT
    ) {
        throw new Error('');
    }

    return new TransportOptions({
        host,
        port,
        protocol: protocol as
            | LoggerConstant.PROTOCOL_UDP
            | LoggerConstant.PROTOCOL_TCP
            | LoggerConstant.PROTOCOL_PORT,
        handleExceptions: true,
        fluentPrefix: prefix,
    });
}
