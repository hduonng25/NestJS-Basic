import { configure, emit } from 'fluent-logger';
import * as dgram from 'node:dgram';
import * as net from 'node:net';
import TransportStream from 'winston-transport';
import { LoggerConstant } from '../constant';
import { TypeTransportsOptions } from './transport.type';

/**
 * Cách send log đến logstash, fluent bit theo cách thuần
 */
export class TransportOptions extends TransportStream {
    private readonly host: string;
    private readonly port: number;
    private readonly protocol:
        | LoggerConstant.PROTOCOL_UDP
        | LoggerConstant.PROTOCOL_TCP
        | LoggerConstant.PROTOCOL_PORT;
    private readonly fluentPrefix?: string;

    constructor(private readonly opts: TypeTransportsOptions) {
        super();
        this.host = this.opts.host;
        this.port = this.opts.port;
        this.protocol = this.opts.protocol;
        this.fluentPrefix = this.opts.fluentPrefix;
    }

    public log(info: any, next: () => void): void {
        setImmediate(() => {
            this.emit(`${LoggerConstant.EMIT_EVENT}`, info);
        });

        switch (this.protocol) {
            case LoggerConstant.PROTOCOL_PORT:
                this.sendLogByPort(info);
                break;
            case LoggerConstant.PROTOCOL_TCP:
                this.sendLogByTcp(info);
                break;
            default:
                this.sendLogByUdp(info);
                break;
        }
        next();
    }

    public sendLogByTcp(info: any): void {
        const message: string = this.getMessage(info);
        const client = net
            .createConnection({ host: this.host, port: this.port }, () => {
                client.write(message, (err) => {
                    client.destroy();
                    if (err) throw err;
                });
            })
            .on(`${LoggerConstant.CLIENT_ERROR_EVENT}`, (err) => {
                throw err;
            });
    }

    public sendLogByUdp(info: any): void {
        const message: string = this.getMessage(info);
        const data = Buffer.from(message);
        const client = dgram.createSocket(`${LoggerConstant.TYPE_SOCKET}`);

        client.send(data, this.port, this.host, (error) => {
            client.close();
            if (error) throw error;
        });
    }

    public sendLogByPort(info: any): void {
        const message: string = this.getMessage(info);

        configure(this.fluentPrefix, {
            host: this.host,
            port: this.port,
            timeout: Number(LoggerConstant.TIME_OUT),
            reconnectInterval: Number(LoggerConstant.RECONNECT_INTERVAL),
        });

        emit(`${LoggerConstant.APPLICATION_MONITOR}`, JSON.parse(message));
    }

    public getMessage(info: any): string {
        if (info.exception) {
            info = {
                message: info.message,
                level: info.level,
                tags: [LoggerConstant.EXCEPTION],
            };
        }

        if (info.tags) {
            info[`${LoggerConstant.INFO_TAG}`] = info.tags;
            delete info.tags;
        }

        if (info.level) {
            info[`${LoggerConstant.INFO_LEVEL}`] = info.level;
            delete info.level;
        }

        delete info.from;

        return JSON.stringify(info);
    }
}
