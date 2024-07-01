import { LoggerConstant } from '../constant';
import { TransportStreamOptions } from 'winston-transport';

export type ServerTransportInformation = {
    host?: string;
    port?: number;
    protocol?: LoggerConstant.PROTOCOL_UDP | LoggerConstant.PROTOCOL_TCP | LoggerConstant.PROTOCOL_PORT;
    fluentPrefix?: string;
    node?: string;
    username?: string;
    password?: string;
};

export type TypeTransportsOptions = Partial<ServerTransportInformation> & TransportStreamOptions;
